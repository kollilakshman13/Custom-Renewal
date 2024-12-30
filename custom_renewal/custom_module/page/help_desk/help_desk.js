// frappe.pages['help-desk'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Help Desk',
// 		single_column: true
// 	});
// }


frappe.pages['help-desk'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Help Desk',
        single_column: true
    });

    // Append your custom HTML to the page
    $(page.body).append(`
        <div class="flex h-screen w-screen antialiased">
            <div class="z-0 flex select-none flex-col border-r border-gray-200 bg-gray-50 p-2 text-base duration-300 ease-in-out" style="min-width:224px;max-width:224px;">
                <div class="relative inline-block text-left mb-2 ml-0.5">
                    <div>
                        <div class="flex">
                            <button class="flex h-12 items-center rounded-md py-2 duration-300 ease-in-out w-52 px-2 hover:bg-gray-200">
                                <div class="relative inline-block shrink-0 w-8 h-8 rounded-full">
                                    <img src="/files/64-network-security.png" class="rounded-full h-full w-full object-cover">
                                </div> 
                                <div class="flex flex-1 flex-col text-left duration-300 ease-in-out ml-2 w-auto opacity-100">
                                    <div class="text-base font-medium leading-none text-gray-900">Helpdesk</div>
                                    <div class="mt-1 text-sm leading-none text-gray-700">Administrator lakshmankolli</div> 
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="all flex h-7 cursor-pointer items-center rounded pl-2 pr-1 text-gray-800 duration-300 ease-in-out w-full hover:bg-gray-100 mb-1">
                    <span class="shrink-0 text-gray-700"></span>
                    <div class="ml-2 flex shrink-0 grow items-center justify-between text-sm duration-300 ease-in-out">
                        Search
                        <span class="flex items-center gap-0.5 font-medium text-gray-600"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>
                            <span>K</span>
                        </span>
                    </div>
                </div>

                <span class="mb-4">
                    <div class="all flex h-7 cursor-pointer items-center rounded pl-2 pr-1 text-gray-800 duration-300 ease-in-out w-full hover:bg-gray-100 relative">
                        <span class="shrink-0 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                            </svg>
                        </span>
                        <div class="ml-2 flex shrink-0 grow items-center justify-between text-sm duration-300 ease-in-out"> Notification </div>
                    </div>
                </span>
            </div>
        </div>
    `);

    // Load custom CSS
    frappe.require("/assets/custom_renewal/css/help_desk.css");
};





