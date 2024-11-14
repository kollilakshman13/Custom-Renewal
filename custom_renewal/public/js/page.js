
// frappe.ui.Page.prototype.setup_sidebar_toggle = function () {
//     let sidebar_toggle = $(".page-head").find(".sidebar-toggle-btn");
//     let sidebar_wrapper = this.wrapper.find(".layout-side-section");

//     if (this.disable_sidebar_toggle || !sidebar_wrapper.length) {
//         sidebar_toggle.last().remove();
//     } else {
//         sidebar_toggle.attr("title", __("Toggle Sidebar")).tooltip({
//             delay: { show: 600, hide: 100 },
//             trigger: "hover",
//         });

//         sidebar_toggle.click(() => {
//             if (frappe.utils.is_xs() || frappe.utils.is_sm()) {
//                 this.setup_overlay_sidebar();
//             } else {
//                     // Toggle sidebar visibility
//                 sidebar_wrapper.toggle();

//                     // Toggle sidebar width between col-lg-1 and col-lg-2
//                 if (sidebar_wrapper.hasClass("col-lg-2")) {
//                     sidebar_wrapper.removeClass("col-lg-2").addClass("col-lg-1");
//                 } else {
//                     sidebar_wrapper.removeClass("col-lg-1").addClass("col-lg-2");
//                 }
//             }

//                 // Trigger the toggleSidebar event for additional effects or listeners
//             $(document.body).trigger("toggleSidebar");

//                 // Update the sidebar icon based on the new state
//             this.update_sidebar_icon();
//         });

//     };
// };




frappe.ui.Page.prototype.setup_sidebar_toggle = function () {
    //console.log("Custom sidebar toggle function loaded");
    // Original function content
    let sidebar_toggle = $(".page-head").find(".sidebar-toggle-btn");
    let sidebar_wrapper = this.wrapper.find(".layout-side-section");

    if (this.disable_sidebar_toggle || !sidebar_wrapper.length) {
        sidebar_toggle.last().remove();
    } else {
        sidebar_toggle.attr("title", __("Toggle Sidebar")).tooltip({
            delay: { show: 600, hide: 100 },
            trigger: "hover",
        });

        // Flag to track sidebar state
        let isSidebarCollapsed = false;

        sidebar_toggle.click(() => {
            if (frappe.utils.is_xs() || frappe.utils.is_sm()) {
                this.setup_overlay_sidebar();
            } else {
                // Toggle sidebar visibility and adjust column width
                isSidebarCollapsed = !isSidebarCollapsed;
                sidebar_wrapper.toggleClass("col-lg-1", isSidebarCollapsed);
                sidebar_wrapper.toggleClass("col-lg-2", !isSidebarCollapsed);
                //console.log("collapse")
                // Add or remove 'sidebar-item-label' based on collapse state
                sidebar_wrapper.find(".sidebar-item-label").toggleClass("d-none", isSidebarCollapsed);

            }

            $(document.body).trigger("toggleSidebar");
            this.update_sidebar_icon();
        });
    }
};



// custom_workspace.js

frappe.views.CustomWorkspace = class CustomWorkspace extends frappe.views.Workspace {
    constructor(wrapper) {
        super(wrapper);
    }
    // Override the `build_sidebar_section` method
    build_sidebar_section(title, root_pages) {
        let sidebar_wrapper = this.wrapper.find(".layout-side-section");
        let sidebar_section = $(`<div class="standard-sidebar-section nested-container" data-title="${title}"></div>`);
        let $title = $(`<div class="standard-sidebar-label">
            <span>${frappe.utils.icon("small-down", "xs")}</span>
            <span class="section-title">${__(title)}<span>
        </div>`).appendTo(sidebar_section);

        this.prepare_sidebar(root_pages, sidebar_section, this.sidebar);

        // Reference to the main sidebar container
        let sidebar_container = $(".list-sidebar");

        // Click event to toggle visibility and width
        $title.on("click", (e2) => {
            let icon = $(e2.target).find("span use").attr("href") === "#icon-small-down" ? "#icon-right" : "#icon-small-down";
            $(e2.target).find("span use").attr("href", icon);
            $(e2.target).parent().find(".sidebar-item-container").toggleClass("hidden");

            // Toggle sidebar width based on the collapse state
            let isCollapsed = sidebar_container.hasClass("collapsed");
            sidebar_container.toggleClass("collapsed", !isCollapsed);

            // Adjust width based on new collapse state
            if (!isCollapsed) {
                sidebar_wrapper.removeClass("col-lg-2").addClass("sidebar-collapsed");
                //sidebar_wrapper.removeClass("col-lg-2").addClass("col-lg-1");
                //console.log("sidebar collapse")
            } else {
                sidebar_wrapper.removeClass("sidebar-collapsed").addClass("col-lg-2");
                //sidebar_wrapper.removeClass("col-lg-1").addClass("col-lg-2");
                //console.log("sidebar expanded")
            }

        });

        // Hide the section if there are no items in root_pages
        if (Object.keys(root_pages).length === 0) {
            sidebar_section.addClass("hidden");
        }

        $(".item-anchor").on("click", () => {
            $(".list-sidebar.hidden-xs.hidden-sm").removeClass("opened");
            $(".close-sidebar").css("display", "none");
            $("body").css("overflow", "auto");
        });

        // Hide sidebar if all items are marked as hidden
        if (sidebar_section.find(".sidebar-item-container").length && sidebar_section.find("> [item-is-hidden='0']").length == 0) {
            sidebar_section.addClass("hidden show-in-edit-mode");
        }
    }
};
// Override the default Workspace with the custom class
frappe.views.Workspace = frappe.views.CustomWorkspace;








