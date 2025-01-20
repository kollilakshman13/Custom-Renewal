frappe.pages['fixed_sidebar'].on_page_load = function(wrapper) {
    const path = window.location.pathname;
    const basePath = '/fixed_sidebar/';
    const page = path.replace(basePath, '') || 'default';

    if (page === 'sales_invoice') {
        loadSalesInvoiceContent();
    } else if (page === 'sales_order') {
        loadSalesOrderContent();
    } else if (page === 'renewal_list') {
        loadRenewalListContent();
    } else {
        wrapper.innerHTML = '<h2>Welcome</h2><p>Select an item from the sidebar to display its content here.</p>';
    }

    function loadSalesInvoiceContent() {
        // Load Sales Invoice content
    }

    function loadSalesOrderContent() {
        // Load Sales Order content
    }

    function loadRenewalListContent() {
        // Load Renewal List content
    }
};
