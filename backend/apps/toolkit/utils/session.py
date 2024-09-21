def get_session(request):
    if request.session.session_key is None:
        request.session.create()
    return request.session.session_key
