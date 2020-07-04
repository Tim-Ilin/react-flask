import os, uuid, re
from flask import Flask, request, redirect, url_for, send_from_directory, jsonify

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "temp")
ALLOWED_EXTENSIONS = {'srt'}

app = Flask(__name__)
app.secret_key = "super secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024


def allowed_file(filename):
    filename = filename.replace('"', '')
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def convert_to_vtt(file):
    try:
        with open(file) as infile:
            content = infile.read()
        content_new = re.sub('^\d+\n', '\n', content, flags=re.M)
        re_content_new = re.sub('([\d]+),([\d]+)', r'\1.\2', content_new, flags=re.M)
        re_re_content_new = re.sub('(:\d+\.\d+)\n\n', r'\1\n', re_content_new, flags=re.M)
        re_re_re_content_new = re.sub('\n{3,}', '\n\n', re_re_content_new, flags=re.M)
        infile.close()
        with open(file, 'w') as outfile:
            outfile.write("WEBVTT\n" + re_re_re_content_new)
        file_without_extension = os.path.splitext(file)[0]
        os.rename(file, file_without_extension + ".vtt")
        return True
    except Exception as err:
        return err


def create_temp_dir():
    temp_dir_name = str(uuid.uuid1())
    temp_path = os.path.join(UPLOAD_FOLDER, temp_dir_name)
    os.mkdir(temp_path)
    return temp_dir_name


@app.route('/uploads/<temp_directory>/<filename>')
def uploaded_file(temp_directory, filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], temp_directory), filename)


@app.route('/api/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files and request['content_length'] > app.config['MAX_CONTENT_LENGTH']:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = file.filename.replace('"', '')
            temp_dir = create_temp_dir()
            path_to_filename = os.path.join(UPLOAD_FOLDER, temp_dir, filename)
            file.save(path_to_filename)
            call_converting = convert_to_vtt(path_to_filename)
            if isinstance(call_converting, Exception):
                return jsonify(err=call_converting)
            else:
                return jsonify(
                    url=url_for('uploaded_file', temp_directory=temp_dir, filename=filename.split('.')[0] + '.vtt'))

    return jsonify(type="Only 'srt' extension is support")


if __name__ == "__main__":
    app.run(debug=True)
