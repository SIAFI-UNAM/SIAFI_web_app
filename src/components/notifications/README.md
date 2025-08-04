# Sistema de Notificaciones SIAFI

Sistema completo de notificaciones para la aplicación SIAFI, que incluye componentes reutilizables, gestión de estado global y soporte para notificaciones toast.

## Características

- ✅ 4 tipos de notificaciones: `success`, `warning`, `error`, `info`
- ✅ Componentes reutilizables con diseño consistente
- ✅ Sistema de toast con auto-ocultado
- ✅ Integración con el sistema de colores SIAFI
- ✅ Tipografía y estilos consistentes
- ✅ Accesibilidad incluida (ARIA, roles)
- ✅ TypeScript completo

## Instalación y Configuración

### 1. Envolver la aplicación con el proveedor

```tsx
import { NotificationProvider, NotificationContainer } from './components';

function App() {
  return (
    <NotificationProvider>
      <div className="app">
        {/* Tu aplicación */}
        <main>
          {/* Contenido */}
        </main>
        
        {/* Container de notificaciones toast */}
        <NotificationContainer position="top-right" />
      </div>
    </NotificationProvider>
  );
}
```

### 2. Usar en componentes

#### Notificaciones Toast (Dinámicas)

```tsx
import { useToast } from './components';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success({
      title: '¡Éxito!',
      message: ' Operación completada exitosamente',
      duration: 5000 // opcional
    });
  };

  const handleError = () => {
    toast.error({
      title: '¡Error!',
      message: ' Ha ocurrido un problema',
      duration: 8000 // errores duran más tiempo por defecto
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleError}>Mostrar Error</button>
    </div>
  );
}
```

#### Notificaciones Estáticas

```tsx
import { 
  SuccessNotification, 
  WarningNotification,
  ErrorNotification,
  InfoNotification 
} from './components';

function MyPage() {
  return (
    <div>
      <SuccessNotification
        title="¡Completado!"
        message=" El proceso ha terminado exitosamente"
      />
      
      <WarningNotification
        title="¡Atención!"
        message=" Revisa la configuración antes de continuar"
      />
    </div>
  );
}
```

#### Componente Genérico

```tsx
import { Notification } from './components';

function CustomNotification() {
  return (
    <Notification
      type="info"
      title="¡Información!"
      message=" Datos actualizados recientemente"
      className="mb-4" // clases adicionales
    />
  );
}
```

## API de Referencia

### useToast Hook

```tsx
const toast = useToast();

// Métodos disponibles
toast.success(options)    // Notificación de éxito
toast.warning(options)    // Notificación de advertencia  
toast.error(options)      // Notificación de error
toast.info(options)       // Notificación informativa
toast.dismiss(id)         // Cerrar notificación específica
toast.dismissAll()        // Cerrar todas las notificaciones
```

### ToastOptions

```tsx
interface ToastOptions {
  title: string;           // Título de la notificación (en negrita)
  message: string;         // Mensaje de la notificación
  duration?: number;       // Duración en ms (por defecto: 5000ms)
}
```

### NotificationContainer Props

```tsx
interface NotificationContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
  maxNotifications?: number; // máximo número de notificaciones visibles
}
```

## Colores y Estilos

El sistema usa las variables CSS definidas en `index.css`:

- **Success**: `--color-success` (#22C55E)
- **Warning**: `--color-warning` (#FACC15)  
- **Error**: `--color-error` (#EF4444)
- **Info**: `--color-information` (#3B82F6)

### Estructura Visual

Cada notificación tiene:
- Barra lateral de 5px con el color del tipo
- Fondo con color del tipo al 20% de opacidad
- Texto con tipografía Inter
- Título en negrita (`font-bold`)
- Mensaje en peso medium (`font-medium`)

## Accesibilidad

- Atributo `role="alert"` para lectores de pantalla
- `aria-live="polite"` para anuncios no intrusivos
- Botones de cerrar con `aria-label` descriptivo
- Navegación por teclado soportada

## Personalización

### Estilos Personalizados

```tsx
<Notification
  type="success"
  title="Custom"
  message=" Mensaje personalizado"
  className="shadow-2xl border-2 border-green-300"
/>
```

### Duración Personalizada

```tsx
// Sin auto-close
toast.success({
  title: "Persistente",
  message: " Esta notificación no se cierra automáticamente",
  duration: undefined
});

// Duración personalizada
toast.warning({
  title: "Rápida",
  message: " Se cierra en 2 segundos",
  duration: 2000
});
```