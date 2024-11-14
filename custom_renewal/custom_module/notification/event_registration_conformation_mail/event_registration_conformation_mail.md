<p><!doctype Html>
<html>
    <head>
    </head>
    <body>
        <div style="font-family:Arial,sans-serif;margin:20px;padding:10px;background-color:#f4f4f4;text-align:center;">
        <div
            style="width:85%;margin:20px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
            <div style="margin:20px 0;">
                <h1 style="text-algn:center"><img src="https://cdn-icons-png.freepik.com/256/15649/15649403.png?ga=GA1.1.973524378.1729854330&amp;semt=ais_hybrid" style="width:40px;height:40px;"></h1>
                <h3 style="color:#333333;text-align:center;font-size:18px;">Thank you for registering!</h3>
                <p style="color:#666666;line-height:1.5;text-align:center;">
                    <img src="https://cdn-icons-png.freepik.com/256/2886/2886665.png?semt=ais_hybrid" style="width:16px;height:16px;"> {{ frappe.utils.formatdate(doc.event_start_date, "dd-mm-yyyy") }}
                </p>
                <p style="color:#666666;line-height:1.5;text-align:center;">
                    <img src="https://cdn-icons-png.freepik.com/256/17383/17383062.png?ga=GA1.1.973524378.1729854330&amp;semt=ais_hybrid" style="width:16px;height:16px;"> {{ frappe.utils.formattime(doc.event_start_time, "HH:mm:ss") }}
                    to {{ frappe.utils.formattime(doc.event_end_time, "HH:mm:ss") }}
                </p>
            </div>
        </div></p>

<pre><code>    &lt;div
        style="width:85%;margin:20px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);"&gt;
        {% if doc.event_mode == "Online" %}
        &lt;p style="color:#666666;line-height:1.5;text-align:center;"&gt;Online&lt;/p&gt;
        &lt;p style="color:#666666;line-height:1.5;text-align:center;"&gt;
            &lt;a href="{{doc.event_link}}"
                style="color:#1a73e8;text-decoration:none;"&gt;Event Link - Click Here
            &lt;/a&gt;
        &lt;/p&gt;
        {% endif %}
        {% if doc.event_mode == "Offline" %}
            &lt;p style="color:#666666;line-height:1.5;text-align:center;"&gt;Offline&lt;/p&gt;
            &lt;p style="color:#666666;line-height:1.5;text-align:center;"&gt;{{doc.event_venue}}&lt;/p&gt;
        {% endif %}
    &lt;/div&gt;

    &lt;div
        style="width:85%;margin:20px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);"&gt;
        &lt;div
            style="padding:10px 20px;background-color:#f4f4f4;border-bottom-left-radius:8px;border-bottom-right-radius:8px;text-align:center;color:#888888;font-size:12px;"&gt;
            &lt;p style="margin:0;"&gt;&amp;copy; 2024 64 Network Pvt Ltd. All rights reserved.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>

<p></html></p>
