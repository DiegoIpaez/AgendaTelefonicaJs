/*
**Nos piden realizar una agenda telefónica de contactos.**
Un contacto está definido por un nombre y un teléfono. Se considera que un contacto es igual a otro cuando sus nombres son iguales.
Una agenda de contactos está formada por un conjunto de contactos. Se podrá crear de dos formas, indicando nosotros el tamaño o con un tamaño por defecto (10).
Las funciones serán:
------------------------

- aniadirContacto(): Añade un contacto a la agenda, si la agenda no puede almacenar mas contactos indicar por pantalla.
- existeContacto(): indica si el contacto pasado existe o no.
- listarContactos(): Lista toda la agenda
- buscarContacto(nombre): busca un contacto por su nombre y muestra su teléfono.
- eliminarContacto(Contacto): elimina el contacto de la agenda, indica si se ha eliminado o no por pantalla
- agendaLlena(): indica si la agenda está llena.
- huecosLibres(): indica cuántos contactos más podemos ingresar.

*Usar LocalStorage para guardar la info de la agenda y para consultar sus datos*  
*/


console.log("AGENDA TELEFONICA")
console.log("=================")
console.log("Para poder usarla debe escribir los siguientes comandos:")
console.log("=================")
console.log("- añadirContacto() = Añade un contacto a la agenda")
console.log("- existeContacto() = Indica si el contacto existe")
console.log("- listarContactos() = Lista todos los contactos")
console.log("- buscarContacto() = Busca un contacto")
console.log("- eliminarContacto() = Elimina el contacto de la agenda")
console.log("- agendaLlena() = Indica si la agenda está llena")
console.log("- huecosLibres() = Indica cuántos contactos más podemos ingresar")
console.log("=================")



let contactoss=JSON.parse(localStorage.getItem("contactoss")) || []
let cantidad=11 - contactoss.length

class Contacto{
    constructor(contact,num){
        this.contact=contact
        this.num=num
    }
}


function añadirContacto(contact,num){
    contact=prompt("ingrese el nombre su contacto").toLocaleLowerCase()
    while (contact == null || contact == "") {
        contact = prompt(
          `No hay nada, Ingrese el nombre su contacto`
        ).toLocaleLowerCase();
      }


    num=prompt("Ingrese el numero telefonico")
    while (num == null || num == "") {
        num = prompt(
          `No hay nada, Ingrese el numero telefonico`
        );
      }
      while (isNaN(num)) {
        num = parseInt(
          prompt(
            `No ingreso ningun numero, Vuelva a Introducir el numero telefonico`
          )
        );
      }

    let idContacto=contactoss.length
    if(idContacto<=10){
    contactoss.push(new Contacto(contact,num))
    localStorage.setItem(`contactoss`,JSON.stringify(contactoss))
    cantidad--
    }else{console.log("Supero el limite,no se pueden agregar mas contactos")}  
}

function existeContacto(){
    let buscarUser=prompt("Ingrese el contacto").toLocaleLowerCase()
    let user = contactoss.find(function(contacto){
        return contacto.contact === buscarUser
    })
    if(user){
        console.log("el contacto existe")
    }else{console.log("el contacto no existe")}
}

function listContact(){
    contactoss.forEach(function(contacto){
        console.log(`Contacto:${contacto.contact}`)
        console.log(`Numero:${contacto.num}`)
        console.log(`===================`)
    })
}

function buscarContacto(){
    let buscarCon=prompt("Ingrese el contacto que desee buscar").toLocaleLowerCase()
    let buscar=contactoss.find(function(contacto){
        return  contacto.contact === buscarCon
    })

    if(buscar){
        console.log(`Nombre:${buscar.contact}`)
        console.log(`Numero:${buscar.num}`)
        console.log(`-----------------`)
    
      }else{
        console.warn("El contacto no existe, use de nuevo el comando para seguir..")
      }
    }


function deleteContact(){
    let eliminarUser=prompt("Ingrese el contacto que desee eliminar").toLocaleLowerCase()
    let idUser=contactoss.findIndex(function(contacto){
        return contacto.contact===eliminarUser
    })    
    if(idUser>-1){
    let validar=confirm(`esta seguro que quiere eliminar el contacto`)

    if(validar){
        contactoss.splice(idUser,1)
        localStorage.setItem(`contactoss`,JSON.stringify(contactoss))
        console.error(`Se ha eliminado el contacto`)
    }

    }else{
        console.warn("el contacto no existe, use de nuevo el comando para seguir..")
    }
}

function agendaLlena(){
    if(cantidad){
        console.log("La agenda no esta llena")
        console.log("-------------------------")
        contactoss.forEach(function(contacto){
            console.log(`Contacto:${contacto.contact}`)
            console.log(`Numero:${contacto.num}`)
            console.log("-------------------------")
            
        })
    }else{
        console.log("la agenda esta llena")
    }
}

function agendaLibre(){
    if(cantidad){
        console.log(`Le queda ${cantidad} huecos libres para ingresar`)
    }else{
        console.log("No le queda huecos libres")
    }
}