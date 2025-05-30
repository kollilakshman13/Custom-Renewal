// frappe.pages['dabang-dashboard'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'None',
// 		single_column: true
// 	});
// }

frappe.pages['dabang-dashboard'].on_page_load = function (wrapper) {
	//console.log("on_page_load triggered");
	new Mypage(wrapper);
};

class Mypage {
	constructor(wrapper) {
		this.wrapper = wrapper;
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: '', // No page title
			single_column: true
		});
		this.make();
	}


	make() {
		//console.log("Appending body content...");
		let body = frappe.customer_app_page.body;
		$(this.page.main).append(body);

		// frappe.require([
		// 	"https://cdn.jsdelivr.net/npm/chart.js"
		// ], () => {
		// 	this.get_target1();
		// 	this.get_target2();
		// 	this.get_target3();
		// });

		/*frappe.require(["https://cdn.jsdelivr.net/npm/chart.js"], () => {
			try {
				this.get_target1();
				this.get_target2();
				this.get_target3();
			} catch (e) {
				console.error("Chart load error:", e);
			}
		});*/

		frappe.require(["https://d3js.org/d3.v7.min.js"], () => {
			//console.log("✅ D3.js loaded successfully!");
			//this month
			this.get_target1();
			this.get_target2();
			this.get_target3();
		});


	}

	get_target1() {
		new Chart(document.getElementById('targetChart'), {
			type: 'bar',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Reality Sales',
						data: [7000, 9000, 10000, 11000, 12000, 13000, 14000],
						backgroundColor: '#00c48c'
					},
					{
						label: 'Target Sales',
						data: [10000, 11000, 12000, 13000, 14000, 15000, 16000],
						backgroundColor: '#ffc107'
					}
				]
			},
			options: {
				responsive: true,
				plugins: { legend: { display: false } },
				scales: {
					y: {
						beginAtZero: true,
						ticks: { stepSize: 5000 }
					}
				}
			}
		});
	}

	get_target2() {
		// Customer Satisfaction Line Chart
		new Chart(document.getElementById('satisfactionChart'), {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				datasets: [
					{
						label: 'Last Month',
						data: [300, 320, 290, 310, 280, 330],
						borderColor: '#007bff',
						backgroundColor: 'transparent',
						tension: 0.4
					},
					{
						label: 'This Month',
						data: [350, 380, 400, 420, 410, 440],
						borderColor: '#00c48c',
						backgroundColor: 'rgba(0,196,140,0.1)',
						tension: 0.4,
						fill: true
					}
				]
			},
			options: {
				responsive: true,
				plugins: { legend: { display: false } },
				scales: {
					y: { beginAtZero: false }
				}
			}
		});
	}

	get_target3() {
		// Total Revenue Bar Chart
		new Chart(document.getElementById('revenueChart'), {
			type: 'bar',
			data: {
				labels: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
				datasets: [
					{
						label: 'Online Sales',
						data: [13000, 17000, 16000, 22000],
						backgroundColor: '#007bff'
					},
					{
						label: 'Offline Sales',
						data: [11000, 22000, 6000, 11000],
						backgroundColor: '#00c48c'
					}
				]
			},
			options: {
				responsive: true,
				plugins: { legend: { display: false } },
				scales: {
					y: {
						beginAtZero: true,
						ticks: { stepSize: 5000 }
					}
				}
			}
		});
	}
}


frappe.customer_app_page = {
	body: `
		<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-1w7occi">
			<div class="MuiStack-root css-1fs5jgw">
				<div>
					<h4 class="MuiTypography-root MuiTypography-h4 css-1nwvoxm">Today's Sales</h4>
					<h6 class="MuiTypography-root MuiTypography-subtitle1 css-gi54v2">Sales Summary</h6>
				</div><button
					class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation css-vqpu7e"
					tabindex="0" type="button"><span
						class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-m53b2o"><svg
							xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
							role="img" class="iconify iconify--solar MuiBox-root css-0" width="1em" height="1em"
							viewBox="0 0 24 24">
							<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
								<path
									d="M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877">
								</path>
								<path stroke-linejoin="round" d="M12 15V2m0 0l3 3.5M12 2L9 5.5"></path>
							</g>
						</svg></span>Export<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
			</div>
			<div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3.875 MuiGrid-spacing-xl-2 css-19r2f0n">
				<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 css-13qzgsu">
					<div
						class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-anx9cz">
						<div class="MuiCardContent-root css-170lf45">
							<div class="MuiStack-root css-wuuaxe"><svg
									class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dwpknh" focusable="false"
									aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M5 3C3.89543 3 3 3.89545 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89545 20.1046 3 19 3H5ZM8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13V17C6 17.5523 6.44772 18 7 18C7.55228 18 8 17.5523 8 17V13ZM12 9C12.5523 9 13 9.44769 13 10V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V10C11 9.44769 11.4477 9 12 9ZM18 7C18 6.44769 17.5523 6 17 6C16.4477 6 16 6.44769 16 7V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V7Z"
										fill="white"></path>
								</svg></div>
							<h3 class="MuiTypography-root MuiTypography-h3 css-159c9iz">$1k</h3>
							<p class="MuiTypography-root MuiTypography-h6 css-h2lfac">Total Sales</p>
							<p class="MuiTypography-root MuiTypography-caption css-5jrgec">Last day +8%</p>
						</div>
					</div>
				</div>
				<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 css-13qzgsu">
					<div
						class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-7d1snf">
						<div class="MuiCardContent-root css-170lf45">
							<div class="MuiStack-root css-byb6k"><svg
									class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dwpknh" focusable="false"
									aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M4 6C4 3.79086 5.79086 2 8 2H14V6C14 8.20914 15.7909 10 18 10H20V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H8ZM8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17H12C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15H8ZM16.6818 4.19879L16.5509 6.16288C16.5106 6.76656 17.0115 7.26743 17.6152 7.22718L19.5792 7.09624C20.4365 7.03909 20.8274 5.99887 20.2198 5.39135L18.3867 3.5582C17.7792 2.95068 16.7389 3.34153 16.6818 4.19879Z"
										fill="white"></path>
								</svg></div>
							<h3 class="MuiTypography-root MuiTypography-h3 css-159c9iz">300</h3>
							<p class="MuiTypography-root MuiTypography-h6 css-h2lfac">Total Order</p>
							<p class="MuiTypography-root MuiTypography-caption css-5jrgec">Last day +5%</p>
						</div>
					</div>
				</div>
				<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 css-13qzgsu">
					<div
						class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1l9ts0b">
						<div class="MuiCardContent-root css-170lf45">
							<div class="MuiStack-root css-jjpzas"><svg xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
									class="iconify iconify--ion MuiBox-root css-11rdppg" width="1em" height="1em"
									viewBox="0 0 512 512">
									<path fill="currentColor"
										d="M467 45.2A44.45 44.45 0 0 0 435.29 32H312.36a30.63 30.63 0 0 0-21.52 8.89L45.09 286.59a44.82 44.82 0 0 0 0 63.32l117 117a44.83 44.83 0 0 0 63.34 0l245.65-245.6A30.6 30.6 0 0 0 480 199.8v-123a44.24 44.24 0 0 0-13-31.6M384 160a32 32 0 1 1 32-32a32 32 0 0 1-32 32">
									</path>
								</svg></div>
							<h3 class="MuiTypography-root MuiTypography-h3 css-159c9iz">5</h3>
							<p class="MuiTypography-root MuiTypography-h6 css-h2lfac">Sold</p>
							<p class="MuiTypography-root MuiTypography-caption css-5jrgec">Last day +1.2%</p>
						</div>
					</div>
				</div>
				<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 css-13qzgsu">
					<div
						class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-4jagai">
						<div class="MuiCardContent-root css-170lf45">
							<div class="MuiStack-root css-1n2ipj5"><svg xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
									class="iconify iconify--material-symbols MuiBox-root css-11rdppg" width="1em"
									height="1em" viewBox="0 0 24 24">
									<path fill="currentColor"
										d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z">
									</path>
								</svg></div>
							<h3 class="MuiTypography-root MuiTypography-h3 css-159c9iz">8</h3>
							<p class="MuiTypography-root MuiTypography-h6 css-h2lfac">Customers</p>
							<p class="MuiTypography-root MuiTypography-caption css-5jrgec">Last day +0.5%</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 col-md-12 col-lg-6 col-xl-6" style="background-color:white;border-radius:10px;">
				<div class="d-flex justify-content-between p-1">
					<div>
						<h2>Today's Sales</h2>
						<p>Sales Summary</p>
					</div>
					<div>
						<button class="export-btn ">Export</button>
					</div>
				</div>
				<div class="row">
					<div class="col-6 col-md-3 col-lg-3 col-xl-3">
						<div class="card pink">
							<div class="icon">📊</div>
							<h3>$1k</h3>
							<p>Total Sales</p>
							<span>Last day +8%</span>
						</div>
					</div>
					<div class="col-6 col-md-3 col-lg-3 col-xl-3">
						<div class="card yellow">
							<div class="icon">🧾</div>
							<h3>300</h3>
							<p>Total Order</p>
							<span>Last day +5%</span>
						</div>
					</div>
					<div class="col-6 col-md-3 col-lg-3 col-xl-3">
						<div class="card green">
							<div class="icon">🏷️</div>
							<h3>5</h3>
							<p>Sold</p>
							<span>Last day +1.2%</span>
						</div>
					</div>
					<div class="col-6 col-md-3 col-lg-3 col-xl-3">
						<div class="card purple">
							<div class="icon">👥</div>
							<h3>8</h3>
							<p>Customers</p>
							<span>Last day +0.5%</span>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-12 col-lg-6 col-xl-6">
				<div class="card">
					<h2>Visitor Insights</h2>
					<canvas id="visitorChart"></canvas>
					<div class="legend">
						<span><span class="dot purple"></span> Loyal Customers</span>
						<span><span class="dot red"></span> New Customers</span>
						<span><span class="dot green"></span> Unique Customers</span>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-2">
			<div class="col-12 col-md-12 col-lg-4 col-xl-4">
				<div class="card">
					<h3>Total Revenue</h3>
					<canvas id="revenueChart"></canvas>
					<div class="legend">
						<span><span class="dot blue"></span> Online Sales</span>
						<span><span class="dot green"></span> Offline Sales</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-12 col-lg-4 col-xl-4">
				<div class="card">
					<h3>Customer Satisfaction</h3>
					<canvas id="satisfactionChart"></canvas>
					<div class="legend">
						<span><span class="dot blue"></span> Last Month</span> $1,017
						<span><span class="dot green"></span> This Month</span> $1,757
					</div>
				</div>
			</div>
			<div class="col-12 col-md-12 col-lg-4 col-xl-4">
				<div class="card">
					<h3>Target vs Reality</h3>
					<canvas id="targetChart"></canvas>
					<div class="legend">
						<span><span class="dot green"></span> Reality Sales</span> 8.823
						<span><span class="dot yellow"></span> Target Sales</span> 12.122
					</div>
				</div>
			</div>
		</div>

		<!-- For Web Template or custom HTML page -->
		<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

	`

}	