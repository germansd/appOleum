"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Droplets,
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  Plus,
  Euro,
  Calendar,
  AlertTriangle,
} from "lucide-react"

export default function Dashboard() {
  const [showMaquilaModal, setShowMaquilaModal] = useState(false)
  const [showPedidoModal, setShowPedidoModal] = useState(false)

  const stats = [
    {
      title: "Total Facturado",
      value: "€234,750",
      change: "+18.5%",
      icon: TrendingUp,
      color: "text-green-600",
      description: "Este mes",
    },
    {
      title: "Litros en Maquila",
      value: "14,250 L",
      change: "+12.8%",
      icon: Droplets,
      color: "text-blue-600",
      description: "Campaña actual",
    },
    {
      title: "Clientes Activos",
      value: "247",
      change: "+7.2%",
      icon: Users,
      color: "text-purple-600",
      description: "Total registrados",
    },
    {
      title: "Pedidos del Mes",
      value: "156",
      change: "+22.1%",
      icon: ShoppingCart,
      color: "text-orange-600",
      description: "Enero 2024",
    },
  ]

  const additionalStats = [
    {
      title: "Rendimiento Promedio",
      value: "21.1%",
      icon: BarChart3,
      color: "text-green-600",
      description: "Campaña 2024",
    },
    {
      title: "Stock Total",
      value: "3,450 L",
      icon: Package,
      color: "text-blue-600",
      description: "Disponible",
    },
    {
      title: "Facturas Pendientes",
      value: "23",
      icon: Euro,
      color: "text-yellow-600",
      description: "€45,680 total",
    },
    {
      title: "Días Restantes",
      value: "45",
      icon: Calendar,
      color: "text-purple-600",
      description: "Campaña 2024",
    },
  ]

  const recentActivity = [
    {
      type: "Pedido",
      client: "Restaurante El Olivo",
      amount: "€345",
      time: "Hace 1 hora",
      status: "completado",
      details: "8 botellas 500ml",
    },
    {
      type: "Maquila",
      client: "Finca Los Remedios",
      amount: "1,250 kg",
      time: "Hace 2 horas",
      status: "procesando",
      details: "Picual - 24.2% rendimiento",
    },
    {
      type: "Factura",
      client: "Supermercados García",
      amount: "€2,150",
      time: "Hace 3 horas",
      status: "enviada",
      details: "15 garrafas 5L",
    },
    {
      type: "Pedido",
      client: "Hotel Majestic",
      amount: "€890",
      time: "Hace 4 horas",
      status: "pendiente",
      details: "35 latas premium",
    },
    {
      type: "Maquila",
      client: "Cooperativa San José",
      amount: "2,100 kg",
      time: "Hace 5 horas",
      status: "completado",
      details: "Arbequina - 20.5% rendimiento",
    },
    {
      type: "Factura",
      client: "Distribuidora Andaluza",
      amount: "€1,680",
      time: "Hace 6 horas",
      status: "pagada",
      details: "25 garrafas 5L",
    },
    {
      type: "Pedido",
      client: "Restaurante La Aceituna",
      amount: "€425",
      time: "Hace 1 día",
      status: "entregado",
      details: "12 botellas 500ml",
    },
    {
      type: "Maquila",
      client: "Olivar Santa María",
      amount: "1,680 kg",
      time: "Hace 1 día",
      status: "procesando",
      details: "Cornicabra - estimado 22.8%",
    },
  ]

  const alertas = [
    {
      tipo: "stock",
      mensaje: "Stock bajo en Lata Premium 250ml",
      cantidad: "15 unidades",
      urgencia: "alta",
    },
    {
      tipo: "factura",
      mensaje: "Factura vencida - Hotel Los Olivos",
      cantidad: "€520",
      urgencia: "alta",
    },
    {
      tipo: "maquila",
      mensaje: "Procesamiento completado - Listo para recoger",
      cantidad: "195 L",
      urgencia: "media",
    },
    {
      tipo: "pedido",
      mensaje: "Nuevo pedido urgente - Restaurante El Molino",
      cantidad: "€544",
      urgencia: "media",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen general de tu almazara - Campaña 2024</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showMaquilaModal} onOpenChange={setShowMaquilaModal}>
            <DialogTrigger asChild>
              <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Entrada Maquila 
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Entrada de Maquila</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cliente">Cliente </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finca-remedios">Finca Los Remedios</SelectItem>
                        <SelectItem value="cooperativa-san-jose">Cooperativa San José</SelectItem>
                        <SelectItem value="olivar-santa-maria">Olivar Santa María</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fecha">Fecha de Entrada</Label>
                    <Input type="date" id="fecha" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input type="number" id="peso" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="variedad">Variedad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar variedad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="picual">Picual</SelectItem>
                        <SelectItem value="arbequina">Arbequina</SelectItem>
                        <SelectItem value="cornicabra">Cornicabra</SelectItem>
                        <SelectItem value="hojiblanca">Hojiblanca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea id="observaciones" placeholder="Notas adicionales sobre la entrada..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowMaquilaModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#708238] hover:bg-[#5a6b2d]">
                    Registrar Entrada
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showPedidoModal} onOpenChange={setShowPedidoModal}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Pedido</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cliente-pedido">Cliente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurante-olivo">Restaurante El Olivo</SelectItem>
                        <SelectItem value="hotel-majestic">Hotel Majestic</SelectItem>
                        <SelectItem value="supermercados-garcia">Supermercados García</SelectItem>
                        <SelectItem value="distribuidora-andaluza">Distribuidora Andaluza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fecha-entrega">Fecha de Entrega</Label>
                    <Input type="date" id="fecha-entrega" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="producto">Producto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="botella-500ml">Botella 500ml Premium</SelectItem>
                        <SelectItem value="garrafa-5l">Garrafa 5L</SelectItem>
                        <SelectItem value="lata-250ml">Lata Premium 250ml</SelectItem>
                        <SelectItem value="bag-in-box-3l">Bag in Box 3L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cantidad">Cantidad</Label>
                    <Input type="number" id="cantidad" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="precio">Precio Unitario (€)</Label>
                    <Input type="number" step="0.01" id="precio" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notas-pedido">Notas del Pedido</Label>
                  <Textarea id="notas-pedido" placeholder="Instrucciones especiales, descuentos, etc..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowPedidoModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#708238] hover:bg-[#5a6b2d]">
                    Crear Pedido
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-[#708238]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} desde el mes pasado</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#708238]" />
              Producción Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="h-full flex items-end justify-between gap-2">
                {[
                  { mes: "Oct", valor: 1250, porcentaje: 65 },
                  { mes: "Nov", valor: 1180, porcentaje: 61 },
                  { mes: "Dic", valor: 1420, porcentaje: 74 },
                  { mes: "Ene", valor: 1680, porcentaje: 87 },
                  { mes: "Feb", valor: 1520, porcentaje: 79 },
                  { mes: "Mar", valor: 1750, porcentaje: 91 },
                  { mes: "Abr", valor: 1920, porcentaje: 100 },
                  { mes: "May", valor: 1650, porcentaje: 86 },
                  { mes: "Jun", valor: 1480, porcentaje: 77 },
                  { mes: "Jul", valor: 1380, porcentaje: 72 },
                  { mes: "Ago", valor: 1280, porcentaje: 67 },
                  { mes: "Sep", valor: 1450, porcentaje: 75 },
                ].map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 group">
                    <div className="relative w-full flex items-end justify-center mb-2">
                      <div
                        className="w-8 bg-[#708238] rounded-t-sm transition-all duration-300 group-hover:bg-[#5a6b2d] relative"
                        style={{ height: `${data.porcentaje * 2}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.valor}L
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{data.mes}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Producción mensual de aceite (Litros)</p>
                <p className="text-xs text-gray-500 mt-1">Promedio: 1,498L/mes | Total año: 17,980L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "Pedido"
                          ? "bg-green-500"
                          : activity.type === "Maquila"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{activity.client}</p>
                      <p className="text-sm text-gray-600">
                        {activity.type} - {activity.details}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{activity.amount}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas y Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Alertas y Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    alerta.urgencia === "alta" ? "bg-red-50 border-l-red-500" : "bg-yellow-50 border-l-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{alerta.mensaje}</p>
                      <p className="text-sm text-gray-600">{alerta.cantidad}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        alerta.urgencia === "alta" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {alerta.urgencia}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Package className="w-6 h-6" />
                <span>Gestionar Inventario</span>
                <span className="text-xs text-gray-500">42 productos</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="w-6 h-6" />
                <span>Ver Clientes</span>
                <span className="text-xs text-gray-500">247 activos</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <BarChart3 className="w-6 h-6" />
                <span>Generar Reporte</span>
                <span className="text-xs text-gray-500">Campaña 2024</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Euro className="w-6 h-6" />
                <span>Facturación</span>
                <span className="text-xs text-gray-500">23 pendientes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen Financiero */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Financiero - Enero 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">€234,750</div>
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-xs text-green-600">+18.5% vs mes anterior</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">€45,680</div>
              <p className="text-sm text-gray-600">Pendiente de Cobro</p>
              <p className="text-xs text-blue-600">23 facturas</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">€1,505</div>
              <p className="text-sm text-gray-600">Ticket Promedio</p>
              <p className="text-xs text-purple-600">Por pedido</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">34.5%</div>
              <p className="text-sm text-gray-600">Margen Promedio</p>
              <p className="text-xs text-orange-600">Muy saludable</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
