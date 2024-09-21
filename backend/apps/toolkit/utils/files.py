import io
import os
import shutil
from uuid import uuid4
from io import BytesIO
from django.core.files import File

from PIL import Image, ImageOps
from django.utils.deconstruct import deconstructible
from rest_framework.exceptions import ValidationError


@deconstructible
class FilePath(object):
    def __init__(self, path):
        self.path = path

    def __call__(self, instance, filename):
        *origin, ext = filename.split('.')
        origin = '.'.join(origin)

        if not hasattr(instance, '_instance_level_unique_id'):
            instance._instance_level_unique_id = uuid4().hex

        return f"{self.path}.{ext}".format(
            **instance.__dict__,
            origin=origin,
            uuid=instance._instance_level_unique_id
        )


def file_path(path):
    return FilePath(path)


def delete_file(path):
    if os.path.exists(path):
        os.remove(path)


def test_file(name='test.png', extension='png'):
    file = io.BytesIO()
    image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
    image.save(file, extension)
    file.name = name
    file.seek(0)
    return file


def clear_uploads():
    uploads = './uploads'
    if os.path.exists(uploads) and os.path.isdir(uploads):
        shutil.rmtree(uploads)


def size_2mb(value):
    if value.size > 2097152:
        raise ValidationError("The maximum file size that can be uploaded is 2MB")
    return value


def image_resize(image, size=(100, 100)):
    """Makes thumbnails of given size from given image"""

    im = Image.open(image)
    im.convert('RGB')  # convert mode
    im = ImageOps.fit(im, size)  # resize image
    thumb_io = BytesIO()  # create a BytesIO object
    im.save(thumb_io, 'JPEG', quality=85)  # save image to BytesIO object
    return File(thumb_io, name=image.name)  # create a django friendly File object
