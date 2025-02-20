import frappe
no_cache=1
def get_context(context):
    user_email = frappe.session.user

    # Administrator logic
    if user_email == "Administrator":
        context.doc = frappe.get_all(
            "Sales Invoice",
            fields=["name","posting_date","status","custom_invoice_attachment","rounded_total","customer_name"],
            order_by="creation desc"
        )
        for order in context.doc:
            order.item_name = frappe.get_value(
                "Sales Invoice Item", 
                {"parent": order.name}, 
                "item_name"
            )
            order.rounded_total = frappe.utils.fmt_money(order.rounded_total,currency="INR")
        context.message = "Showing all renewal lists as Administrator."
        return context

    # Guest logic
    if user_email == "Guest":
        context.doc = []
        context.message = "Please log in to view renewal lists."
        return context

    # Logic for logged-in users
    contact_name = frappe.db.get_value("Contact", {"email_id": user_email}, "name")
    if contact_name:
        customer = frappe.db.get_value(
            "Dynamic Link",
            {"parenttype": "Contact", "parent": contact_name, "link_doctype": "Customer"},
            "link_name"
        )
    else:
        customer = None

    if customer:
        context.doc = frappe.get_all(
            "Sales Invoice",
            filters={"customer_name": customer},
            fields=["name","posting_date","status","custom_invoice_attachment","rounded_total","customer_name"],
            order_by="creation desc"
        )
        for order in context.doc:
            order.item_name = frappe.get_value(
                "Sales Invoice Item", 
                {"parent": order.name}, 
                "item_name"
            ) 
            order.rounded_total = frappe.utils.fmt_money(order.rounded_total,currency="INR")  
        context.message = f"Showing renewal lists for customer: {customer}."
    else:
        context.doc = []
        context.message = "You are not authorized to view renewal lists."

    return context
