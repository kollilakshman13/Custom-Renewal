import frappe
no_cache=1
def get_context(context):
    user_email = frappe.session.user
    frappe.logger().info(f"User Email: {user_email}")
    context.message1 = f"user email {user_email}"
    user_role= frappe.get_roles(user_email)
    if user_email == "Administrator" and "Customer" in user_role:
        context.doc = frappe.get_all(
            "Sales Order",
            fields=["name","customer_name","transaction_date","rounded_total","status"],
            order_by="creation desc"
        )
        for order in context.doc:
            order.item_name = frappe.get_value(
                "Sales Order Item", 
                {"parent": order.name}, 
                "item_name"
            )
            order.rounded_total = frappe.utils.fmt_money(order.rounded_total,currency="INR")
        context.message = f"Showing all renewal lists as Administrator: {user_email}."
        return context
    if user_email == "Guest":
        context.doc = []
        context.message = "Please log in to view renewal lists."
        return context
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
        frappe.logger().info("Fetching Sales Orders for customer")
        context.doc = frappe.get_all(
            "Sales Order",
            filters={"customer_name": customer},
            fields=["name","customer_name","transaction_date","rounded_total","status"],
            order_by="creation desc"
        )
        for order in context.doc:
            order.item_name = frappe.get_value(
                "Sales Order Item", 
                {"parent": order.name}, 
                "item_name"
            )  
            order.rounded_total = frappe.utils.fmt_money(order.rounded_total,currency="INR") 
        context.message = f"user data fetched successfully:{user_email}."
    else:
        context.doc = []
        context.message = "You are not authorized to view renewal lists."
    return context
