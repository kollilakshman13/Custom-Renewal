from frappe.website.doctype.website_sidebar.website_sidebar import WebsiteSidebar
import frappe

class CustomWebsiteSidebar(WebsiteSidebar):
    def get_items(self, context):
        # Fetch items from the Website Sidebar Item doctype
        items = frappe.get_all(
            "Website Sidebar Item",
            filters={"parent": self.name},
            fields=["title", "route", "group", "icon"],
            order_by="idx asc",
        )

        items_by_group = {}
        items_without_group = []
        for item in items:
            # Organize items by groups
            if item.group:
                items_by_group.setdefault(item.group, []).append(item)
            else:
                items_without_group.append(item)

        # Prepare the output structure
        out = []
        for group, items in items_by_group.items():
            out.append({"group_title": group, "group_items": items})

        # Append items without groups
        out += items_without_group

        return out

    def get_context(context):
        context.sidebar_items = CustomWebsiteSidebar().get_items(context)
        return context
