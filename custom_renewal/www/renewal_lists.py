
# import frappe
# from frappe import _

# def get_context(context):
#     # Fetch the d_name parameter from the request
#     d_name = frappe.form_dict.get('d_name')

#     if not d_name:
#         context.items = []
#         context.message = _("No Renewal Name provided.")
#         return context

#     # Fetch Renewal Items filtered by parent = d_name
#     renewal_items = frappe.get_all(
#         'Renewal Item',
#         filters={'parent': d_name},
#         fields=['item_code', 'rate']
#     )

#     # Add data to the context for rendering in the template
#     context.items = renewal_items
#     context.d_name = d_name

import frappe
from frappe import _

def get_context(context):
    # Fetch the d_name parameter from the request
    d_name = frappe.form_dict.get('d_name')

    if not d_name:
        context.items = []
        context.message = _("No Renewal Name provided.")
        return context

    # Fetch the parent record from the relevant Doctype (e.g., Renewal)
    renewal_doc = frappe.get_doc('Renewal List', d_name) if frappe.db.exists('Renewal List', d_name) else None

    if not renewal_doc:
        context.items = []
        context.message = _("No Renewal found for the provided name.")
        return context

    # Fetch Renewal Items filtered by parent = d_name
    renewal_items = frappe.get_all(
        'Renewal Item',
        filters={'parent': d_name},
        fields=['*']
    )

    # Add data to the context for rendering in the template
    context.items = renewal_items
    context.d_name = renewal_doc  # Pass the entire document to the template



