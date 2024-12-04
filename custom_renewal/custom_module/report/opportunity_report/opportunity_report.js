// Copyright (c) 2024, lakshman and contributors
// For license information, please see license.txt
/* eslint-disable */

// frappe.query_reports["Opportunity Report"] = {
// 	"filters": [

// 	]
// };


/*frappe.query_reports["Opportunity Report"] = {
	"filters": [
		{
			"fieldname":"name",
			"label":"Opportunity ID",
			"fieldtype":"Data",
			"width":100
		},
        {
			"fieldname":"customer_name",
			"label":"Customer",
			"fieldtype":"Link",
			"options":"Customer",
			"width":100,
			"redg":0
		},
		{
			"fieldname":"contact_person",
			"label":"Contact Person",
			"fieldtype":"Link",
			"options":"Contact",
			"width":100,
			"redg":0
		},
		{
			"fieldname":"from",
			"label":"From Date",
			"fieldtype":"Date",
			"width":100,
			"redg":1,
			"default":dateutil.year_start()
		},
		{
			"fieldname":"to",
			"label":"To Date",
			"fieldtype":"Date",
			"width":100,
			"redg":1,
			"default":dateutil.year_end()
		},
		{
			"fieldname":"item",
			"label":"Item",
			"fieldtype":"Data",
			"width":100
		}
	]
};*/




frappe.query_reports["Opportunity Report"] = {
    "filters": [
        {
            "fieldname": "name",
            "label": "Opportunity ID",
            "fieldtype": "Data",
            "width": 100
        },
        {
            "fieldname": "customer_name",
            "label": "Customer",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 100,
            "reqd": 0,
            "change": function() {
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
            "get_query": function() {
                let customer = frappe.query_report.get_filter_value("customer_name");
                if (customer) {
                    return {
                        filters: {
                            link_name: customer
                        }
                    };
                }
            }
        },
        {
            "fieldname": "from",
            "label": "From Date",
            "fieldtype": "Date",
            "width": 100,
            "reqd": 1,
            "default": frappe.datetime.year_start()
        },
        {
            "fieldname": "to",
            "label": "To Date",
            "fieldtype": "Date",
            "width": 100,
            "reqd": 1,
            "default": frappe.datetime.year_end()
        },
        {
            "fieldname": "item",
            "label": "Item",
            "fieldtype": "Data",
            "width": 100
        }
    ]
};






