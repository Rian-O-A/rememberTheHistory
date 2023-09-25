import datetime
from flask import Flask
from flask_jwt_extended import JWTManager
from cryptography.hazmat.primitives import serialization
from backend.auth.credentials import passwordRSAPriv, secretKey
from flask_cors import CORS

app = Flask(__name__)

# Read private key from file
with open('backend/auth/ssh/rememberTheHistory', 'rb') as private_key_file:
    private_key_data = private_key_file.read()

# Read public key from file
with open('backend/auth/ssh/rememberTheHistory.pub', 'rb') as public_key_file:
    public_key_data = public_key_file.read()




try:
    prKey = serialization.load_ssh_private_key(private_key_data, password=passwordRSAPriv.encode('utf-8'))
    pubKey = serialization.load_ssh_public_key(public_key_data)
    # Use prKey and pubKey for further processing
except ValueError as e:
    print("Error loading keys:", e)
    
# Configuração do Flask
app.config['SECRET_KEY'] = secretKey

# Configuração do JWT
app.config["JWT_PRIVATE_KEY"] = prKey
app.config["JWT_PUBLIC_KEY"] = pubKey
app.config['JWT_ALGORITHM'] = 'RS256'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=2880)
jwt = JWTManager(app)

def create_app():
    # Registro do Blueprint de autenticação
    from .routes.authorization import authRoute
    from .routes.default import authDefault
    from .routes.managerUser import managerUser
    
    app.register_blueprint(authDefault, url_prefix="/all")
    app.register_blueprint(authRoute, url_prefix="/auth")
    app.register_blueprint(managerUser, url_prefix="/user")
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    # Manipulador de rota OPTIONS genérico
    @app.route('/', methods=['OPTIONS'])
    @app.route('/<path:path>', methods=['OPTIONS'])
    def options_handler(path=None):
        return '', 204

    # Outras configurações e registros de Blueprints e rotas vão aqui
    return app
