# Copyright (c) 2024, lakshman and contributors
# For license information, please see license.txt

# import frappe


# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data


# import frappe

# def execute(filters=None):
#     columns = get_columns()
#     data = get_opportunity_data()
#     return columns, data


# def get_opportunity_data():
#     sql_query = """
#         SELECT 
#             rl.name AS renewal_list_name,
#             rl.customer,
# 			rc.user_name AS contact_person
#         FROM 
#             `tabRenewal List` AS rl
# 		LEFT JOIN 
#             `tabRenewal Contacts` AS rc ON rl.name = rc.parent	
#     """
#     data = frappe.db.sql(sql_query, as_dict=True)
#     return data


# def get_columns():
#     return [
#         "Renewal List Name:Data:200",
#         "Customer:Data:300",
# 		"Contact Person:Data:300"
#     ]



# import frappe

# def execute(filters=None):
#     """
#     Main function to execute the report.
#     """
#     columns = get_columns()
#     data = get_opportunity_data(filters)
#     return columns, data


# def get_opportunity_data(filters):
#     conditions = []
#     values = {}

#     if filters.get("customer"):
#         conditions.append("rl.customer = %(customer)s")
#         values["customer"] = filters["customer"]

#     if filters.get("contact_person"):
#         conditions.append("rc.user_name = %(contact_person)s")
#         values["contact_person"] = filters["contact_person"]

#     where_clause = " AND ".join(conditions)
#     if where_clause:
#         where_clause = f"WHERE {where_clause}"

#     sql_query = f"""
#         SELECT 
#             rl.name AS renewal_list_name,
#             rl.customer,
#             rc.user_name AS contact_person
#         FROM 
#             `tabRenewal List` AS rl
#         LEFT JOIN 
#             `tabRenewal Contacts` AS rc ON rl.name = rc.parent
#         {where_clause}
#     """
#     return frappe.db.sql(sql_query, values=values, as_dict=True)


# def get_columns():
#     return [
#         "Renewal List Name:Data:200",
#         "Customer:Link/Customer:300",
#         "Contact Person:Link/Contact:300"
#     ]




import frappe

def execute(filters=None):
    columns = get_columns()
    data = get_renewal_data(filters)
    return columns, data


def get_renewal_data(filters):
    filters = filters or {}
    conditions = []
    values = {}

    if filters.get("customer"):
        conditions.append("rl.customer IN %(customer)s")
        values["customer"] = tuple(filters["customer"])

    if filters.get("contact_person"):
        conditions.append("rc.user_name IN %(contact_person)s")
        values["contact_person"] = tuple(filters["contact_person"])

    where_clause = " AND ".join(conditions)
    if where_clause:
        where_clause = f"WHERE {where_clause}"

    sql_query = f"""
        SELECT 
            rl.name AS renewal_list_name,
            rl.customer,
            rc.user_name AS contact_person
        FROM 
            `tabRenewal List` AS rl
        LEFT JOIN 
            `tabRenewal Contacts` AS rc ON rl.name = rc.parent
        {where_clause}
    """
    return frappe.db.sql(sql_query, values=values, as_dict=True)


def get_columns():
    return [
        {"label": "Renewal List Name", "fieldname": "renewal_list_name", "fieldtype": "Data", "width": 200},
        {"label": "Customer", "fieldname": "customer", "fieldtype": "Link", "options": "Customer", "width": 300},
        {"label": "Contact Person", "fieldname": "contact_person", "fieldtype": "Link", "options": "Contact", "width": 300},
    ]






