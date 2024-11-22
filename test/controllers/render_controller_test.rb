require "test_helper"

class RenderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get renders_url  # Usa el helper generado por la ruta
    assert_response :success
  end
end
