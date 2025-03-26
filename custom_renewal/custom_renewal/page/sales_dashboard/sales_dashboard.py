import frappe
from frappe.utils import getdate, formatdate

@frappe.whitelist()
def get_total_price(sales_person=None):
    # total = frappe.db.sql(f"""
    #     SELECT SUM(total) AS total FROM `tabOpportunity`
    # """, as_dict=True)[0].total or 0

    # return total
    #frappe.msgprint(f"sales_person: {sales_person}")

    condition = ""
    if sales_person:
        condition = f"WHERE sales_person = '{sales_person}'"

    total = frappe.db.sql(f"""
        SELECT SUM(total) AS total FROM `tabOpportunity` {condition}
    """, as_dict=True)[0].total or 0

    return total


@frappe.whitelist()
def get_total_numbers(sales_person=None):
   
    # name = frappe.db.sql(f"""
    #     SELECT COUNT(DISTINCT name) AS name FROM `tabOpportunity`
    # """, as_dict=True)[0].name or 0

    # return name

    condition = ""
    if sales_person:
        condition = f"WHERE sales_person = '{sales_person}'"

    name = frappe.db.sql(f"""
        SELECT COUNT(DISTINCT name) AS name FROM `tabOpportunity` {condition}
    """, as_dict=True)[0].name or 0

    return name


import frappe

@frappe.whitelist()
def get_dashboard_data(filter):
    data = []

    if filter == "all":
        data = [
            {"title": "Total Sales", "value": "$10,000"},
            {"title": "New Orders", "value": "150"},
            {"title": "Customers", "value": "75"},
            {"title": "Revenue", "value": "$25,000"},
        ]
    elif filter == "last_week":
        data = [
            {"title": "Total Sales", "value": "$2,500"},
            {"title": "New Orders", "value": "40"},
            {"title": "Customers", "value": "20"},
            {"title": "Revenue", "value": "$6,000"},
        ]
    elif filter == "this_month":
        data = [
            {"title": "Total Sales", "value": "$8,000"},
            {"title": "New Orders", "value": "120"},
            {"title": "Customers", "value": "60"},
            {"title": "Revenue", "value": "$20,000"},
        ]
    elif filter == "this_year":
        data = [
            {"title": "Total Sales", "value": "$50,000"},
            {"title": "New Orders", "value": "500"},
            {"title": "Customers", "value": "250"},
            {"title": "Revenue", "value": "$100,000"},
        ]

    return data


import frappe

@frappe.whitelist()
def get_weekly_data(filter):
    data_map = {
        "last_week": "Sales: $5,000 | Orders: 50",
        "this_month": "Sales: $20,000 | Orders: 200",
        "this_quarter": "Sales: $50,000 | Orders: 500",
        "this_year": "Sales: $200,000 | Orders: 2,000",
    }
    return data_map.get(filter, "No data available")


