import { Button, Select, Grid, Center, position } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { result, set } from 'lodash';
import axios from 'axios';
import { GrDocumentPdf } from 'react-icons/gr';
import { NonceProvider } from 'chakra-react-select';
import { ControlledSelect, Input } from '@/components/form-fields';
import { InputFile } from '../tutorial-file';
import { TutorialFileCard } from '../tutorial-file-card';
import { Tutorial, TutorialPayload } from '../../type';

interface TutorialFromProps {
  defaultValues?: TutorialPayload;
  onSubmit: (data: TutorialPayload) => void;
  isSubmitting: boolean;
}

export function TutorialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: TutorialFromProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);
  let nomeArquivo;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const [fileName, setFileName] = useState(null);
  const inputRef = useRef();

  // const file = (document.getElementById('myfiles') as HTMLInputElement);
  // const message = (document.getElementById("message") as HTMLParagraphElement);
  // console.log(document.getElementById('myfiles'));

  // file?.addEventListener('input', () => {
  //   if (file?.files?.length > 0) {
  //     let fileName = file?.files[0].name;
  //     console.log(file);
  //   }
  // })

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    // console.log(event.dataTransfer.files[0]);
    setFileName(event.dataTransfer.files[0]);
  };

  if (fileName) {
    nomeArquivo = fileName.name;
    console.log(nomeArquivo);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Input
        label="Nome do tutorial"
        {...register('name', { required: 'Campo obrigatório' })}
        placeholder="Digite o nome do tutorial"
        errors={errors?.name}
      />

      <Input
        label="ID da categoria"
        {...register('category_id', { required: 'Campo obrigatório' })}
        placeholder="Digite o id da categoria"
        errors={errors?.name}
      />
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span
          aria-controls="input"
          className="file"
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 50,
            paddingBottom: 50,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dotted white',
            borderRadius: 6,
          }}
        >
          <GrDocumentPdf
            size="40"
            style={{
              alignContent: 'center',
              filter: 'invert(0.6)',
            }}
          />

          <span style={{ color: '#dbdada' }}>
            Arraste e solte um arquivo...
          </span>
        </span>

        <Input
          id="fileinput"
          label=""
          type="file"
          // Call handleFile function when a file is selected before uploading
          {...register('file', { required: 'Campo obrigatório' })}
          placeholder="Escolha um arquivo e jogue"
          errors={errors?.name}
          onChange={(event) => setFileName(event.target.files[0])}
          hidden
          // ref={inputRef}
        />
        {/* <button
          type="button"
          onClick={() => inputRef.current.click()}
          style={{ marginTop: 20 }}> Escolha os arquivos</button> */}
      </div>

      {nomeArquivo && (
        <div
          style={{
            borderBottom: '2px solid rgb(255,255,255)',
            borderRadius: 1,
          }}
        >
          <p style={{ marginBottom: 10, display: 'flex' }}>
            <GrDocumentPdf
              size={25}
              style={{
                display: 'inline',
                marginRight: 15,
                marginLeft: 5,
                filter: 'invert(1)',
              }}
            />
            <span>{nomeArquivo}</span>
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button type="submit" size="lg" width="80%" isLoading={isSubmitting}>
          {isEditing ? 'Salvar' : 'Criar Tutorial'}
        </Button>
      </div>
    </form>
  );
}
