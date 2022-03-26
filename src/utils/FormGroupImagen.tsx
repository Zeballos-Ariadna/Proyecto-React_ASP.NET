import { ChangeEvent } from "react";

export default function FormGroupImagen(props: formGroupImagenProps){
    const ManejarOnChange=(e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files){
            const archivo= e.currentTarget.files[0]; 
            aBase64(archivo)
                .then((valor:string) => {return})           
        }
    }

    const aBase64=(file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=> resolve (reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    }

    return(
        <div className="form-group">
            <label>{props.label}</label>
            <div>
                <input type="file" accept=".jpg, .jpeg, .png" onChange={ManejarOnChange}/>
            </div>
        </div>
    )
}

interface formGroupImagenProps{
    campo: string;
    label: string;
    imagenURL?: string;
}