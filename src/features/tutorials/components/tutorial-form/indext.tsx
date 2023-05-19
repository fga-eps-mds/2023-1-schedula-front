import { Button, Select, Grid, Center, position } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { result } from 'lodash';
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

  // const filepicker = document.getElementById("fileinput");

  // console.log(filepicker)

  // filepicker?.addEventListener('change', (event) => {
  //   const files = event.target.files[0];
  //   console.log(files)

  // })

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

      {/* <ControlledSelect
        control={control}
        name="city_payload"
        id="city_payload"
        options={citiesOptions}
        isLoading={isLoadingCities}
        placeholder="Cidade"
        label="Cidade"
        rules={{ required: 'Campo obrigatório' }}
      /> */}

      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
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

          <span>Selecione um arquivo...</span>
        </span>

        <Input
          id="fileinput"
          label=""
          type="file"
          // Call handleFile function when a file is selected before uploading
          {...register('file', { required: 'Campo obrigatório' })}
          placeholder="Selecione o arquivo do tutorial"
          errors={errors?.name}
          style={{ display: 'none' }}
        />

        <input type="file" id="fileTest" />
      </div>

      <TutorialFileCard /* filename={fileName} */ />

      {/* <div
        style={{
          marginTop: 20,
          border: '2px dotted white', 
          borderRadius: 6,
          paddingTop: 80,
          paddingBottom: 80,
          textAlign: 'center'
      
        }}
      >
        <div style={{display:"flex", justifyContent: 'center'}}>
          <GrDocumentPdf
              size="40"
              style={{
                alignContent: 'center',
                filter: 'invert(0.6)',
              }}
            />
        </div>

          

        <p>Adicione um Arquivo</p>


        

        <div style={{}}>
          <Input
          id='file__input'
          label=""
          type="file"
          // Call handleFile function when a file is selected before uploading
          {...register('file', { required: 'Campo obrigatório' })}
          placeholder="Selecione o arquivo do tutorial"
          errors={errors?.name}
          />
        </div>

        

      </div> */}

      <Grid templateColumns="1fr 0fr" style={{ marginTop: 12 }}>
        <Button size="lg" width="45%">
          Cancelar
        </Button>
        <Button type="submit" size="lg" width="45%" isLoading={isSubmitting}>
          {isEditing ? 'Salvar' : 'Criar Tutorial'}
        </Button>
      </Grid>
    </form>
  );
}
