// Copyright (c) 2024, lakshman and contributors
// For license information, please see license.txt
/* eslint-disable */

/*frappe.query_reports["Sales Invoice Report"] = {
	"filters": [
	]
};*/


// Update your Frappe report to include this code
/*frappe.query_reports["Sales Invoice Report"] = {
	"filters": [
		{
			"fieldname": "name",
			"label": "Sales Invoice ID",
			"fieldtype": "Link",
			"options": "Sales Invoice",
			"width": 100
		},
		{
			"fieldname": "from",
			"label": "From Date",
			"fieldtype": "Date",
			"width": 100,
			"redg": 1,
			"default": dateutil.year_start()
		},
		{
			"fieldname": "to",
			"label": "To Date",
			"fieldtype": "Date",
			"width": 100,
			"redg": 1,
			"default": dateutil.year_end()
		}

	],
	
	onload: function (report) {
		$(report.page.body).on('click', '.view-comments-btn', function () {
			const sales_invoice = $(this).attr("data-sales-invoice");
			frappe.call({
				method: "custom_renewal.api.get_comments",
				args: {
					reference_doctype: "Sales Invoice",
					reference_name: sales_invoice
				},
				callback: function (r) {
					if (r.message) {
						const comments = r.message.map(comment => {
							return `<p><strong>${comment.owner}:</strong> ${comment.content}</p>`;
						}).join("");
						frappe.msgprint({
							title: `Comments for ${sales_invoice}`,
							indicator: 'blue',
							message: comments || "<p>No comments found.</p>"
						});
					}
				}
			});
		});

		
	}
};*/

frappe.query_reports["Sales Invoice Report"] = {
	filters: [
		{
			fieldname: "name",
			label: "Sales Invoice ID",
			fieldtype: "Link",
			options: "Sales Invoice",
			width: 100
		},
		{
			fieldname: "from",
			label: "From Date",
			fieldtype: "Date",
			width: 100,
			default: frappe.datetime.year_start()
		},
		{
			fieldname: "to",
			label: "To Date",
			fieldtype: "Date",
			width: 100,
			default: frappe.datetime.year_end()
		}
	],

	formatter: function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname === "check") {
			return `<input type="checkbox" class="report-checkbox" data-row='${data.name}'>`;
		}
		return value;
	},

	onload: function (report) {
		report.page.add_inner_button("Assign to Salesperson", function () {
			let selected = [];
			$('.report-checkbox:checked').each(function () {
				selected.push($(this).attr("data-row"));
			});

			if (!selected.length) {
				frappe.msgprint("Please select at least one Sales Invoice.");
				return;
			}

			frappe.prompt([
				{
					label: 'Salesperson (User Email)',
					fieldname: 'user_email',
					fieldtype: 'Link',
					options: 'User',
					reqd: 1
				}
			], function (values) {
				frappe.call({
					method: 'custom_renewal.api.bulk_assign_salesperson_by_user',
					args: {
						sales_invoices: selected,
						user_email: values.user_email
					},
					callback: function (r) {
						if (r.message === "ok") {
							frappe.msgprint("Salesperson (User) assigned successfully.");
							report.refresh();
						}
					}
				});
			}, 'Assign Salesperson (User)', 'Assign');
		});


		$(report.page.body).on('click', '.view-comments-btn', function () {
			const sales_invoice = $(this).attr("data-sales-invoice");
			frappe.call({
				method: "custom_renewal.api.get_comments",
				args: {
					reference_doctype: "Sales Invoice",
					reference_name: sales_invoice
				},
				callback: function (r) {
					if (r.message) {
						const comments = r.message.map(comment => {
							return `<p><strong>${comment.owner}:</strong> ${comment.content}</p>`;
						}).join("");
						frappe.msgprint({
							title: `Comments for ${sales_invoice}`,
							indicator: 'blue',
							message: comments || "<p>No comments found.</p>"
						});
					}
				}
			});
		});
	}
};



