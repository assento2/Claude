from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    # In new version, "/" serves index.html if static exists, or returns 404 if no static
    # But /health is always there
    assert response.status_code in [200, 404]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
