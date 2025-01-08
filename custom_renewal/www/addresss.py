import frappe

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
