class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # GET /products
  def index
    @products = Product.all
  end

  # GET /products/1
  def show
  end

  # GET /products/new
  def new
    @product = Product.new
    # Asegúrate de inicializar subcategories como un array vacío
    @product.subcategory ||= []
  end

  # GET /products/1/edit
  def edit
    @product = Product.find(params[:id])
    # Asegúrate de que subcategories no sea nil al editar
    @product.subcategory ||= []
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to @product, notice: 'El producto fue creado con éxito.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      redirect_to @product, notice: 'El producto fue actualizado con éxito.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
    redirect_to products_url, notice: 'El producto fue eliminado con éxito.'
  end

  private

  # Buscar producto por ID
  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(
      :name,
      :description,
      :currency,
      subcategory: [:id, :name, :description, :price, :src, :alt]
    ).tap do |whitelisted|
      # Si no hay subcategorías en los parámetros, preserva las subcategorías anteriores
      if params[:product][:subcategory].blank?
        # Mantén las subcategorías previas si existen, o asigna un array vacío
        whitelisted[:subcategory] = @product.subcategory.presence || [{}]
      else
        # Si hay subcategorías nuevas, asegúrate de que todas tengan la estructura esperada
        whitelisted[:subcategory].each do |subcategory|
          subcategory[:id] ||= nil  # Asegúrate de que el ID esté presente si es necesario
        end
      end
    end
  end
end
