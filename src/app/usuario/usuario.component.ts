import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios:any;
  usuarioAagregar={name:'', username:'', email:''};

  constructor(private usService: UsuariosService) 
  { 
    this.listarUsuarios();
  }

  ngOnInit(): void {
  }

  listarUsuarios():void{
    this.usService.listarUsuarios().subscribe({
      next: (r) => this.usuarios = r,
      error: (e) => console.log(JSON.stringify(e))
    });
  }

  eliminarUsuario (id_usuario:number) { 
    console.log("Eliminar usuario:" +id_usuario)
    this.usService.eliminarUsuario(id_usuario).subscribe ( {
                                            next: () => this.listarUsuarios(), 
                                            error: (e) => console.log(JSON.stringify(e))
                                        });
  }

  nuevoUsuario () {
    console.log("NuevoUsuario.");

    this.usService.nuevoUsuario (this.usuarioAagregar).subscribe ( {
                                          next: () =>  this.usuarios.push(this.usuarioAagregar),//this.listarUsuarios(), 
                                          error: (e) => console.log(JSON.stringify(e))
                                        });
  }

}
