# Backend de la aplicación de tareas.
# Solo he añadido el REadme para pushear y comprobar que jenkins funciona.


Script de cálculo y graficado de CP y CPK para cobot de máquina de esfuerzos desplegado en servidor local con pm2.

*Script CPK, CP calculation and plotting for Effort machine cobot deployed in local server with pm2.*


## Informacion
---

Esta aplicación recoge de la BBDD mysql en la la información extraida de la máquina de fuezas con OPC client y calcula los cpks
El front end se puede acceder a traves de la URL: 

*This application collects from the mysql DB on  the information extracted from the power machine with OPC client and calculates the cpks
The front end can be accessed through the URL: 
## Desarrollo
---

### Lenguajes:

* Python

### Desarrollada usando:

* PANDAS
* MATPLOTLIB
* mysql.connector

### BBDD:

* MySQL - 645640@user.password - opcua_client_db


### Test de la API:

---

### Despliegue:


* Desplegada en:  `
* PM2: `

Para lanzarlo hay que abrir una consola y primero ejecutar el comando de abajo:

*To launch it you have to open a console and first execute the command below*

`PM2 ls`

Asi vemos si hay algun servicio ejecutandose.

*So we see if there is any service running*

después lanzar:

*then launch:*

`PM2 start setup.py --name CPK --interpreter py`

`pm2 startup`

`pm2 save`

### Repositorios:

* Front end 
* Back end 

## Licencia
---

## Organización
---
