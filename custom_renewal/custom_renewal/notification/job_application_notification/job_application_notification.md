<h1>Job Applicant Details </h1>

<p>Applicant Name:{{doc.applicant_name}}</p>

<p>Job Title :  {{ doc.job_title }}</p>

<p>Email ID :  {{ doc.email_id }}</p>

<p>Phone Number: {{ doc.phone_number or '' }}</p>

{% if doc.resume_attachment %}
    {% set resume_ext = doc.resume_attachment.split('.')[-1].lower() %}
    {% if resume_ext == 'pdf' %}
        <embed src="{{ doc.resume_attachment }}" type="application/pdf" width="100%" height="800px" />
    {% elif resume_ext in ['jpg', 'jpeg', 'png'] %}
        <img src="{{ doc.resume_attachment }}" alt="Resume Attachment" style="width: 100%; height: auto;" />
    {% endif %}
{% endif %}

