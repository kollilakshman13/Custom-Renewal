# Copyright (c) 2025, lakshman and contributors
# For license information, please see license.txt

# import frappe


# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data

import frappe
def execute(filters=None):
	columns = [
		{
            "label": "Select",
            "fieldname": "select_row",
            "fieldtype": "Check",
            "width": 60
        },
		{
			"label": "Customer", 
			"fieldname": "customer",
			"fieldtype": "Link", 
			"options": "Customer", 
			"width": 300
		},

		{
			"label": "Sales Person", 
			"fieldname": "sales_person",
			"fieldtype": "Data", 
			"width": 200
		},
	]

	conditions, values = get_conditions(filters)

	data = frappe.db.sql("""
		SELECT tc.name as customer, tst.sales_person
		FROM tabCustomer tc
		inner join `tabSales Team` tst on tst.parent = tc.name
		 {conditions}
		GROUP BY tc.name 
		ORDER BY tc.name
	""".format(conditions=conditions), values, as_dict=True)


	currency = filters.presentation_currency or frappe.get_cached_value(
		"Company", filters.company, "default_currency"
	)

	# Initialize select_row to 0 for all rows
	for row in data:
		row["select_row"] = 0
	#report_summary = get_report_summary(filters,columns, currency, data)
	# frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(report_summary)))
	#chart = get_chart_data(filters, columns, data)
	# frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(chart)))

	#return columns, data, None,chart, report_summary
	return columns, data

def get_conditions(filters):
	# frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(filters)))
	conditions = []
	values = {}

	if filters.get("party_name"):
		conditions.append("AND tc.name = %(party_name)s")
		values["party_name"] = filters.get("party_name")

	if filters.get("sales_person"):
		conditions.append("AND tst.sales_person = %(sales_person)s")
		values["sales_person"] = filters.get("sales_person")    

	return " ".join(conditions), values



def get_report_summary(filters,columns, currency, data):
	customer_count = 0
	
	# frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(new)))

	if data:
		for period in data:
			if period.customer :
				customer_count += 1		

	customer_label = ("Customer Count")
	
	return [
		{"value": str(customer_count),"indicator": "Green", "label": customer_label, "datatype": "Data"},
		
	]


def get_chart_data(filters,columns, data):
	customer_count = 0
	
	# frappe.msgprint("<pre>{}</pre>".format(frappe.as_json(data)))

	if data:
		for period in data:
			if period.customer :
				customer_count += 1	

	
	return {
		"data": {
			"labels": "Customers Count",  # show max of 30 items in chart
			"datasets": [{"values": customer_count}],
		},
		"type": "pie",
		"colors":["#c80064"],
	}

