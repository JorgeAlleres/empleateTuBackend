```bash
npm init -y #Inicializar el proyecto para el backend
npm i -D typescript tsx @types/node #Instalat dependencias para trabajar con typescript
npx tsc --init #Genera las configuraciones typescript (desactualizadas)
#Generamos el archivo .swcrc
npm i express #Instalamos dependencias para express
npm i --save-dev @types/express #Corregir errores de tipado entre express y typescript
npm i -D @swc/core @swc/cli #Instalamos las dependencias de swc (sirve para el built)
```