from django.core.mail import send_mail


def send_email(subject, message, from_email, to_email):
    if subject and message and from_email:
        # try:
        send_mail(subject, message, from_email, [to_email])

        return {"details": "email sent"}
        # except:
        # return {"details": "error seding email"}
    else:
        return {"details": "attach all fields"}
