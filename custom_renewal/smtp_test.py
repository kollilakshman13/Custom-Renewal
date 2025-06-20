import smtplib
import time
# Replace with your SMTP credentials and test addresses
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
USERNAME = "kollilakshman13@gmail.com"
PASSWORD = "ughv rzqp owjy fqfg"
FROM_EMAIL = "kollilakshman13@gmail.com"
TO_EMAIL = "kollilakshman07@gmail.com"

start = time.time()

try:
    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
    server.starttls()
    server.login(USERNAME, PASSWORD)
    server.sendmail(
        FROM_EMAIL,
        TO_EMAIL,
        "Subject: Test Email\n\nThis is a test message to measure email send time."
    )
    server.quit()
except Exception as e:
    print("Error:", e)

end = time.time()
print("Email send time:", round(end - start, 2), "seconds")
