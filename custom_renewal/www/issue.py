import frappe

# def get_context(context):
#     user_email = frappe.session.user

#     if user_email == "Administrator":
#         context.doc = frappe.get_all(
#             "Issue",
#             fields=["*"],
#             order_by="creation desc",
#             limit_page_length=20
#         )
            
#         context.message = "Showing all renewal lists as Administrator."
#     elif user_email != "Guest":
#         contact_name = frappe.db.get_value("Contact", {"email_id": user_email}, "name")

#         customer = None
#         if contact_name:
#             customer_link = frappe.db.sql(
#                 """
#                 SELECT link_name
#                 FROM `tabDynamic Link`
#                 WHERE parenttype = 'Contact' 
#                 AND parent = %s 
#                 AND link_doctype = 'Customer'
#                 """,
#                 contact_name,
#                 as_dict=True,
#             )
#             if customer_link:
#                 customer = customer_link[0]["link_name"]

#         if customer:
#             context.doc = frappe.get_all(
#                 "Renewal List",
#                 filters={"customer": customer},
#                 fields=["*"],
#                 order_by="creation desc",
#                 limit_page_length=20
#             )
#             for renewal in context.doc:
#                 renewal_item = frappe.get_value("Renewal Item", {"parent": renewal.name}, "item_name")
#                 renewal.item_name = renewal_item

#         else:
#             context.doc = []
#             context.message = "You are not authorized to view renewal lists."
#     else:
#         context.doc = []
#         context.message = "Please log in to view renewal lists."

#     return context

def get_context(context):
    user_email = frappe.session.user

    # Check if the user is not a guest
    if user_email != "Guest":
        # If the user is Administrator, show all issues
        if user_email == "Administrator":
            context.doc = frappe.get_all(
                "Issue",
                fields=["*"],
                order_by="creation desc",
                limit_page_length=20
            )
        else:
            # If the user is not Administrator, filter by raised_by
            context.doc = frappe.get_all(
                "Issue",
                fields=["*"],
                filters={"raised_by": user_email},
                order_by="creation desc",
                limit_page_length=20
            )
        context.message = "Showing all issues."
    else:     
        context.doc = []
        context.message = "Please log in to view issues."   

    return context       
