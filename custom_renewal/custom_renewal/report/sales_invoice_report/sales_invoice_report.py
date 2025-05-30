# Copyright (c) 2024, lakshman and contributors
# For license information, please see license.txt

# import frappe

# import frappe
# from datetime import datetime

# def execute(filters=None):
#     columns = get_columns()
#     data = get_data(filters)
#     return columns, data

# def get_data(filters):

#     # Apply filters
#     conditions = []
#     if filters.get("name"):
#         conditions.append(f"si.name = '{filters['name']}'")
#     if filters.get("from"):
#         conditions.append(f"si.posting_date >= '{filters['from']}'")
#     if filters.get("to"):
#         conditions.append(f"si.posting_date <= '{filters['to']}'")
#     where_clause = " AND ".join(conditions)
#     where_clause = f"WHERE {where_clause}" if where_clause else ""

#     # Subquery to get the allocated amount for each Sales Invoice
#     allocated_amount_query = """
#         SELECT 
#             per.reference_name AS sales_invoice,
#             SUM(per.allocated_amount) AS total_allocated_amount
#         FROM `tabPayment Entry Reference` AS per
#         WHERE per.reference_doctype = 'Sales Invoice'
#         GROUP BY per.reference_name
#     """

#     # Subquery to get the count of calls for each Sales Invoice
#     call_logs_query = """
#         SELECT 
#             cl.reference_name AS sales_invoice,
#             COUNT(*) AS total_calls
#         FROM `tabCall Logs List` AS cl
#         WHERE cl.reference_type = 'Sales Invoice'
#         GROUP BY cl.reference_name
#     """

#     # Main query to get Sales Invoice data and join with the subqueries
#     sql_query = f"""
#         SELECT 
#             si.name,
#             si.posting_date,
#             si.due_date,
#             si.grand_total,
#             IFNULL(alloc.total_allocated_amount, 0) AS allocated_amount,
#             si.outstanding_amount,
#             IFNULL(calls.total_calls, 0) AS invoice_calls
#         FROM `tabSales Invoice` AS si
#         LEFT JOIN ({allocated_amount_query}) AS alloc ON alloc.sales_invoice = si.name
#         LEFT JOIN ({call_logs_query}) AS calls ON calls.sales_invoice = si.name
#         {where_clause}
#     """

#     data = frappe.db.sql(sql_query, as_dict=True)

#     # Calculate Invoice Age
#     for row in data:
#         if row.get("posting_date"):
#             posting_date = datetime.strptime(str(row["posting_date"]), "%Y-%m-%d")
#             invoice_age = (datetime.today() - posting_date).days
#             row["invoice_age"] = invoice_age
#         else:
#             row["invoice_age"] = None

#         # Add HTML button for viewing comments 
#         row["view_comments"] = f"""
#             <div style="display: flex; justify-content: center; align-items: center;">
#                 <button class="btn btn-primary btn-xs view-comments-btn" style="padding: 3px;" data-sales-invoice="{row['name']}">
#                     View Comments
#                 </button>
#             </div>
#         """
#         row["check"] = "1" 

#     return data

# def get_columns():
#     return [
#         {"label": "", "fieldname": "check", "fieldtype": "Check", "width": 30},
#         {"label": "Sales Invoice ID", "fieldname": "name", "fieldtype": "Data", "width": 200},
#         {"label": "Invoice Date", "fieldname": "posting_date", "fieldtype": "Date", "width": 100},
#         {"label": "Invoice Due Date", "fieldname": "due_date", "fieldtype": "Date", "width": 100},
#         {"label": "Invoice Age (Days)", "fieldname": "invoice_age", "fieldtype": "Int", "width": 80},
#         {"label": "Invoice Amount", "fieldname": "grand_total", "fieldtype": "Currency", "width": 150},
#         {"label": "Allocated Amount", "fieldname": "allocated_amount", "fieldtype": "Currency", "width": 150},
#         {"label": "Invoice Due Amount", "fieldname": "outstanding_amount", "fieldtype": "Currency", "width": 120},
#         {"label": "Invoice Calls", "fieldname": "invoice_calls", "fieldtype": "Int", "width": 80},
#         {"label": "View Comments", "fieldname": "view_comments", "fieldtype": "Button", "width": 120}
        
#     ]

import frappe
from datetime import datetime

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_data(filters):
    conditions = []
    if filters.get("name"):
        conditions.append(f"si.name = '{filters['name']}'")
    if filters.get("from"):
        conditions.append(f"si.posting_date >= '{filters['from']}'")
    if filters.get("to"):
        conditions.append(f"si.posting_date <= '{filters['to']}'")
    where_clause = " AND ".join(conditions)
    where_clause = f"WHERE {where_clause}" if where_clause else ""

    allocated_amount_query = """
        SELECT 
            per.reference_name AS sales_invoice,
            SUM(per.allocated_amount) AS total_allocated_amount
        FROM `tabPayment Entry Reference` AS per
        WHERE per.reference_doctype = 'Sales Invoice'
        GROUP BY per.reference_name
    """

    call_logs_query = """
        SELECT 
            cl.reference_name AS sales_invoice,
            COUNT(*) AS total_calls
        FROM `tabCall Logs List` AS cl
        WHERE cl.reference_type = 'Sales Invoice'
        GROUP BY cl.reference_name
    """

    sql_query = f"""
        SELECT 
            si.name,
            si.posting_date,
            si.due_date,
            si.grand_total,
            IFNULL(alloc.total_allocated_amount, 0) AS allocated_amount,
            si.outstanding_amount,
            IFNULL(calls.total_calls, 0) AS invoice_calls
        FROM `tabSales Invoice` AS si
        LEFT JOIN ({allocated_amount_query}) AS alloc ON alloc.sales_invoice = si.name
        LEFT JOIN ({call_logs_query}) AS calls ON calls.sales_invoice = si.name
        {where_clause}
    """

    data = frappe.db.sql(sql_query, as_dict=True)

    for row in data:
        if row.get("posting_date"):
            posting_date = datetime.strptime(str(row["posting_date"]), "%Y-%m-%d")
            row["invoice_age"] = (datetime.today() - posting_date).days
        else:
            row["invoice_age"] = None

        row["view_comments"] = f"""
            <div style="display: flex; justify-content: center; align-items: center;">
                <button class="btn btn-primary btn-xs view-comments-btn" style="padding: 3px;" data-sales-invoice="{row['name']}">
                    View Comments
                </button>
            </div>
        """
        row["check"] = "1"  # Required for the checkbox column

    return data

def get_columns():
    return [
        {"label": "", "fieldname": "check", "fieldtype": "Data", "width": 30},
        {"label": "Sales Invoice ID", "fieldname": "name", "fieldtype": "Data", "width": 200},
        {"label": "Invoice Date", "fieldname": "posting_date", "fieldtype": "Date", "width": 100},
        {"label": "Invoice Due Date", "fieldname": "due_date", "fieldtype": "Date", "width": 100},
        {"label": "Invoice Age (Days)", "fieldname": "invoice_age", "fieldtype": "Int", "width": 80},
        {"label": "Invoice Amount", "fieldname": "grand_total", "fieldtype": "Currency", "width": 150},
        {"label": "Allocated Amount", "fieldname": "allocated_amount", "fieldtype": "Currency", "width": 150},
        {"label": "Invoice Due Amount", "fieldname": "outstanding_amount", "fieldtype": "Currency", "width": 120},
        {"label": "Invoice Calls", "fieldname": "invoice_calls", "fieldtype": "Int", "width": 80},
        {"label": "View Comments", "fieldname": "view_comments", "fieldtype": "HTML", "width": 120},
    ]





