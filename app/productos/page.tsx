"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Eye, Edit, Trash2, Package, AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Agregar estos estados después de searchTerm
  const [selectedProducto, setSelectedProducto] = useState<any>(null)
  const [editingProducto, setEditingProducto] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Agregar estado para nuevo producto
  const [newProducto, setNewProducto] = useState({
    nombre: "",
    tipo: "",
    capacidad: "",
    precio: 0,
    stock: 0,
    stockMinimo: 0,
    categoria: "",
    descripcion: "",
  })
  const [isNewProductoDialogOpen, setIsNewProductoDialogOpen] = useState(false)

  // Convertir productos en estado
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Aceite Virgen Extra Premium",
      tipo: "Botella",
      capacidad: "500ml",
      precio: 15.5,
      stock: 245,
      stockMinimo: 50,
      categoria: "Premium",
      descripcion: "Aceite de oliva virgen extra de primera calidad, cosecha temprana",
      imagen: "/placeholder.svg?height=200&width=200&text=Premium+500ml",
    },
    {
      id: 2,
      nombre: "Garrafa Familiar",
      tipo: "Garrafa",
      capacidad: "5L",
      precio: 68.0,
      stock: 89,
      stockMinimo: 20,
      categoria: "Familiar",
      descripcion: "Garrafa de 5 litros para uso familiar, excelente relación calidad-precio",
      imagen: "/placeholder.svg?height=200&width=200&text=Garrafa+5L",
    },
    {
      id: 3,
      nombre: "Lata Premium Gourmet",
      tipo: "Lata",
      capacidad: "250ml",
      precio: 12.75,
      stock: 15,
      stockMinimo: 30,
      categoria: "Gourmet",
      descripcion: "Presentación premium en lata metálica, ideal para regalo",
      imagen: "/placeholder.svg?height=200&width=200&text=Lata+Premium",
    },
    {
      id: 4,
      nombre: "Aceite Ecológico Bio",
      tipo: "Botella",
      capacidad: "750ml",
      precio: 22.9,
      stock: 156,
      stockMinimo: 40,
      categoria: "Ecológico",
      descripcion: "Aceite de oliva virgen extra ecológico certificado",
      imagen: "/placeholder.svg?height=200&width=200&text=Bio+750ml",
    },
    {
      id: 5,
      nombre: "Bag in Box Profesional",
      tipo: "Bag in Box",
      capacidad: "3L",
      precio: 45.5,
      stock: 67,
      stockMinimo: 25,
      categoria: "Profesional",
      descripcion: "Formato profesional para restaurantes, conserva mejor el aceite",
      imagen: "/placeholder.svg?height=200&width=200&text=Bag+3L",
    },
    {
      id: 6,
      nombre: "Aceite Suave Familiar",
      tipo: "Botella",
      capacidad: "1L",
      precio: 18.25,
      stock: 198,
      stockMinimo: 60,
      categoria: "Familiar",
      descripcion: "Aceite de sabor suave, perfecto para toda la familia",
      imagen: "/placeholder.svg?height=200&width=200&text=Suave+1L",
    },
    {
      id: 7,
      nombre: "Lata Gourmet Pequeña",
      tipo: "Lata",
      capacidad: "100ml",
      precio: 8.9,
      stock: 23,
      stockMinimo: 50,
      categoria: "Gourmet",
      descripcion: "Formato pequeño ideal para degustaciones y regalos",
      imagen: "/placeholder.svg?height=200&width=200&text=Mini+100ml",
    },
    {
      id: 8,
      nombre: "Garrafa Profesional",
      tipo: "Garrafa",
      capacidad: "10L",
      precio: 125.0,
      stock: 34,
      stockMinimo: 15,
      categoria: "Profesional",
      descripcion: "Garrafa de 10 litros para uso profesional en restaurantes",
      imagen: "/placeholder.svg?height=200&width=200&text=Pro+10L",
    },
  ])

  // Agregar estas funciones antes del return

  // Función para crear producto
  const handleCreateProducto = () => {
    const nuevoProducto = {
      id: productos.length + 1,
      ...newProducto,
      imagen: `/placeholder.svg?height=200&width=200&text=${newProducto.nombre.replace(/\s+/g, "+")}`,
    }

    setProductos((prev) => [...prev, nuevoProducto])
    setNewProducto({
      nombre: "",
      tipo: "",
      capacidad: "",
      precio: 0,
      stock: 0,
      stockMinimo: 0,
      categoria: "",
      descripcion: "",
    })
    setIsNewProductoDialogOpen(false)
  }

  const handleView = (producto: any) => {
    setSelectedProducto(producto)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (producto: any) => {
    setEditingProducto({ ...producto })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setProductos((productos) =>
      productos.map((producto) => (producto.id === editingProducto.id ? editingProducto : producto)),
    )
    setIsEditDialogOpen(false)
    setEditingProducto(null)
  }

  const handleDelete = (id: number) => {
    setProductos((productos) => productos.filter((producto) => producto.id !== id))
  }

  const getStockStatus = (stock: number, minimo: number) => {
    if (stock <= minimo) {
      return { color: "bg-red-100 text-red-800", text: "Stock Bajo" }
    } else if (stock <= minimo * 1.5) {
      return { color: "bg-yellow-100 text-yellow-800", text: "Stock Medio" }
    } else {
      return { color: "bg-green-100 text-green-800", text: "Stock Alto" }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">Administra tu catálogo de aceites</p>
        </div>
        <Dialog open={isNewProductoDialogOpen} onOpenChange={setIsNewProductoDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Producto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre del Producto *</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Aceite Virgen Extra"
                  value={newProducto.nombre}
                  onChange={(e) => setNewProducto((prev) => ({ ...prev, nombre: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select
                    value={newProducto.tipo}
                    onValueChange={(value) => setNewProducto((prev) => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Botella">Botella</SelectItem>
                      <SelectItem value="Garrafa">Garrafa</SelectItem>
                      <SelectItem value="Lata">Lata</SelectItem>
                      <SelectItem value="Bag in Box">Bag in Box</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacidad">Capacidad *</Label>
                  <Input
                    id="capacidad"
                    placeholder="500ml"
                    value={newProducto.capacidad}
                    onChange={(e) => setNewProducto((prev) => ({ ...prev, capacidad: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="precio">Precio (€) *</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProducto.precio || ""}
                    onChange={(e) =>
                      setNewProducto((prev) => ({ ...prev, precio: Number.parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Inicial *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={newProducto.stock || ""}
                    onChange={(e) =>
                      setNewProducto((prev) => ({ ...prev, stock: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="stock-minimo">Stock Mínimo *</Label>
                  <Input
                    id="stock-minimo"
                    type="number"
                    placeholder="0"
                    value={newProducto.stockMinimo || ""}
                    onChange={(e) =>
                      setNewProducto((prev) => ({ ...prev, stockMinimo: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="categoria">Categoría *</Label>
                <Select
                  value={newProducto.categoria}
                  onValueChange={(value) => setNewProducto((prev) => ({ ...prev, categoria: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                    <SelectItem value="Gourmet">Gourmet</SelectItem>
                    <SelectItem value="Ecológico">Ecológico</SelectItem>
                    <SelectItem value="Profesional">Profesional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción del producto"
                  value={newProducto.descripcion}
                  onChange={(e) => setNewProducto((prev) => ({ ...prev, descripcion: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="imagen">Imagen del Producto</Label>
                <Input id="imagen" type="file" accept="image/*" className="cursor-pointer" />
                <p className="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, WebP (máx. 2MB)</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCreateProducto}
                  className="flex-1 bg-[#708238] hover:bg-[#5a6b2d]"
                  disabled={
                    !newProducto.nombre || !newProducto.tipo || !newProducto.capacidad || !newProducto.categoria
                  }
                >
                  Crear Producto
                </Button>
                <Button variant="outline" onClick={() => setIsNewProductoDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">42</div>
            <p className="text-xs text-green-600 mt-1">+6 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€28,750</div>
            <p className="text-xs text-green-600 mt-1">+18% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stock Bajo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-red-600 mt-1">Requieren reposición</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Más Vendido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-gray-900">Aceite Premium 500ml</div>
            <p className="text-xs text-green-600 mt-1">78 unidades/mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#708238]" />
            Catálogo de Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="familiar">Familiar</SelectItem>
                <SelectItem value="gourmet">Gourmet</SelectItem>
                <SelectItem value="ecologico">Ecológico</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="alto">Stock Alto</SelectItem>
                <SelectItem value="medio">Stock Medio</SelectItem>
                <SelectItem value="bajo">Stock Bajo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo/Capacidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado Stock</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => {
                const stockStatus = getStockStatus(producto.stock, producto.stockMinimo)
                return (
                  <TableRow key={producto.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={producto.imagen || "/placeholder.svg"}
                            alt={producto.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{producto.nombre}</div>
                          <div className="text-sm text-gray-500">{producto.descripcion}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{producto.tipo}</div>
                        <div className="text-gray-500">{producto.capacidad}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">€{producto.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{producto.stock}</span>
                        {producto.stock <= producto.stockMinimo && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </div>
                      <div className="text-xs text-gray-500">Mín: {producto.stockMinimo}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={stockStatus.color}>{stockStatus.text}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{producto.categoria}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(producto)} title="Ver detalles">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(producto)} title="Editar">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el producto{" "}
                                {producto.nombre}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(producto.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Modal Ver Detalles */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProducto && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProducto.imagen || "/placeholder.svg"}
                    alt={selectedProducto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProducto.nombre}</h3>
                  <p className="text-gray-600 mb-4">{selectedProducto.descripcion}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-medium">Tipo:</span> {selectedProducto.tipo}
                      </p>
                      <p>
                        <span className="font-medium">Capacidad:</span> {selectedProducto.capacidad}
                      </p>
                      <p>
                        <span className="font-medium">Categoría:</span> {selectedProducto.categoria}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">Precio:</span> €{selectedProducto.precio.toFixed(2)}
                      </p>
                      <p>
                        <span className="font-medium">Stock:</span> {selectedProducto.stock} unidades
                      </p>
                      <p>
                        <span className="font-medium">Stock mínimo:</span> {selectedProducto.stockMinimo} unidades
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsViewDialogOpen(false)} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {editingProducto && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-nombre">Nombre del Producto</Label>
                <Input
                  id="edit-nombre"
                  value={editingProducto.nombre}
                  onChange={(e) => setEditingProducto({ ...editingProducto, nombre: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-precio">Precio (€)</Label>
                  <Input
                    id="edit-precio"
                    type="number"
                    step="0.01"
                    value={editingProducto.precio}
                    onChange={(e) =>
                      setEditingProducto({ ...editingProducto, precio: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editingProducto.stock}
                    onChange={(e) => setEditingProducto({ ...editingProducto, stock: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea
                  id="edit-descripcion"
                  value={editingProducto.descripcion}
                  onChange={(e) => setEditingProducto({ ...editingProducto, descripcion: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
