// Copyright (c) 2025, lakshman and contributors
// For license information, please see license.txt
/* eslint-disable */

/*frappe.query_reports["Customer Without Contacts"] = {
	"filters": [

	]
};*/


frappe.query_reports["Customer Without Contacts"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		},
		{
			"fieldname": "party_name",
			"label": __("Party"),
			"fieldtype": "MultiSelectList",
			"options": "Customer",
			get_data: function (txt) {
				return frappe.db.get_link_options('Customer', txt);
			}
		},
		{
			"fieldname": "sales_person",
			"label": __("Sales Person"),
			"fieldtype": "MultiSelectList",
			"options": "Sales Person",
			get_data: function (txt) {
				return frappe.db.get_link_options('Sales Person', txt);
			}
		},
	],

	formatter: function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname === "select_row") {
			const checked = data.select_row ? 'checked' : '';
			return `<input type="checkbox" class="report-checkbox" data-row='${data.customer}' ${checked}>`;
		}
		return value;
	},

	onload: function (report) {
		let assignBtn;

		function setCheckboxes(checked = true) {
			const dt = report.datatable;
			if (!dt || !dt.wrapper) {
				frappe.msgprint("No data available.");
				return;
			}

			// Update internal row data
			if (dt.datamanager?.data) {
				dt.datamanager.data.forEach(row => {
					row.select_row = checked ? 1 : 0;
				});
			}

			// Refresh datatable to reflect checkbox state
			dt.refresh();

			updateAssignButtonVisibility();
		}

		function updateAssignButtonVisibility() {
			const anyChecked = !!document.querySelector('.report-checkbox:checked');
			if (assignBtn) {
				assignBtn.toggle(anyChecked);
			}
		}

		report.page.add_inner_button(__('Select All'), () => {
			setCheckboxes(true);
		});

		report.page.add_inner_button(__('Clear Selection'), () => {
			setCheckboxes(false);
		});

		assignBtn = report.page.add_inner_button("Assign User", function () {
			let selected = [];
			$('.report-checkbox:checked').each(function () {
				selected.push($(this).attr("data-row"));
			});

			if (!selected.length) {
				frappe.msgprint("Please select at least one customer.");
				return;
			}

			frappe.prompt([
				{
					label: 'User Email',
					fieldname: 'user_email',
					fieldtype: 'Link',
					options: 'User',
					reqd: 1
				}
			], function (values) {
				frappe.call({
					method: 'custom_renewal.api.bulk_assign_customer_to_salesperson_by_user',
					args: {
						customers: selected,
						user_email: values.user_email
					},
					callback: function (r) {
						if (r.message === "ok") {
							frappe.msgprint("User assigned successfully.");
							report.refresh();
						} else {
							frappe.msgprint("Something went wrong: " + (r.message || "No response."));
						}
					}
				});
			}, 'Assign User', 'Assign');
		});

		assignBtn.hide(); // initially hidden

		// Sync checkbox UI with datamanager data
		$(document).on('change', '.report-checkbox', function () {
			const rowKey = $(this).attr("data-row");
			const isChecked = $(this).is(":checked");

			const dt = report.datatable;
			if (dt?.datamanager?.data) {
				let row = dt.datamanager.data.find(r => r.customer === rowKey);
				if (row) {
					row.select_row = isChecked ? 1 : 0;
				}
			}

			updateAssignButtonVisibility();
		});
	}
};
