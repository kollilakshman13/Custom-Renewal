// Copyright (c) 2024, lakshman and contributors
// For license information, please see license.txt
/* eslint-disable */

// frappe.query_reports["Renewal list Report"] = {
// 	"filters": [

// 	]
// };

/*frappe.query_reports["Renewal list Report"] = {
    "filters": [
        {
            "fieldname": "customer",
            "label": "Customer",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 100,
            "reqd": 0,
            "change": function () {
                // Reset contact_person filter when customer changes
                frappe.query_report.set_filter_value("contact_person", null);
                frappe.query_report.refresh();
            }
        },
        {
            "fieldname": "contact_person",
            "label": "Contact Person",
            "fieldtype": "Link",
            "options": "Contact",
            "width": 100,
            "get_query": function () {
                // Get the selected customer
                let customer = frappe.query_report.get_filter_value("customer");
                
                if (customer) {
                    return {
                        query: "frappe.contacts.doctype.contact.contact.contact_query",
                        filters: { link_doctype: "Customer", link_name: customer }
                    };
                } else {
                    return {
                        query: "frappe.contacts.doctype.contact.contact.contact_query"
                    };
                }
            }
        }
    ]
};*/

/**frappe.query_reports["Renewal list Report"] = {
    "filters": [
        {
            "fieldname": "customer",
            "label": "Customer",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 100,
            "reqd": 0,
            "change": function () {
                frappe.query_report.set_filter_value("contact_person", null);
                frappe.query_report.refresh();
            }
        },
        {
            "fieldname": "contact_person",
            "label": "Contact Person",
            "fieldtype": "Link",
            "options": "Contact",
            "width": 100,
            "get_query": function () {
				let customer = frappe.query_report.get_filter_value("customer");
                if (customer) {
                    return {
                        filters: {
                            link_name: customer
                        }
                    };
                }
            }
        }
    ]
};***/



frappe.query_reports["Renewal list Report"] = {
    "filters": [
        {
            "fieldname": "customer",
            "label": "Customer",
            "fieldtype": "MultiSelectList",
            "options": "Customer",
            "width": 100,
            "get_data": function (txt) {
                return frappe.db.get_link_options("Customer", txt);
            },
            "change": function () {
                frappe.query_report.set_filter_value("contact_person", null);
                frappe.query_report.refresh();
            }
        },
        {
            "fieldname": "contact_person",
            "label": "Contact Person",
            "fieldtype": "MultiSelectList",
            "options": "Contact",
            "width": 100,
            "get_data": function (txt) {
                let customers = frappe.query_report.get_filter_value("customer") || [];
                if (customers.length > 0) {
                    return frappe.db.get_link_options("Contact", txt, {
                        link_name: ["in", customers]
                    });
                }
                return frappe.db.get_link_options("Contact", txt);
            }
        }
    ]
};







