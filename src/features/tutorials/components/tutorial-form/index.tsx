import { Button, Select, Grid, Center, position } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { result, set } from 'lodash';
import axios from 'axios';
import { GrDocumentPdf } from 'react-icons/gr';
import { ControlledSelect, Input } from '@/components/form-fields';
import { InputFile } from '../tutorial-file';
import { TutorialFileCard } from '../tutorial-file-card';
import { Tutorial, TutorialPayload } from '../../type';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';

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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoryTutorial();

  const categoryOptions = categories?.map((category) => ({
    label: category?.name,
    value: category?.id,
  }));

  console.log(categoryOptions);

  // const category = watch('CategoryTutorialPayload');

  const [fileName, setFileName] = useState(null);
  const inputRef = useRef();

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

      {/* <Input
        label="ID da categoria"
        {...register('category_id', { required: 'Campo obrigatório' })}
        placeholder="Digite o id da categoria"
        errors={errors?.name}
      /> */}

      <ControlledSelect
        control={control}
        name="category_id"
        id="category_id"
        options={categoryOptions}
        isLoading={isLoadingCategories}
        placeholder="Categoria"
        label="Categoria"
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
          <Input
            id="fileinput"
            label=""
            type="file"
            // Call handleFile function when a file is selected before uploading
            {...register('file', { required: 'Campo obrigatório' })}
            placeholder="Escolha um arquivo e jogue"
            errors={errors?.name}
            onChange={(event) => setFileName(event.target.files[0])}
            style={{
              opacity: 0,
              position: 'absolute',
              zIndex: 1,
              width: '575px',
              height: '170px',
              bottom: '-70px',
            }}
          />
          <span style={{ color: '#dbdada' }}>
            Arraste e solte um arquivo...
          </span>
        </span>
      </div>

      {/* <Input
          id="fileinput"
          label=""
          type="file"
          // Call handleFile function when a file is selected before uploading
          {...register('file', { required: 'Campo obrigatório' })}
          placeholder="Escolha um arquivo e jogue"
          errors={errors?.name}
          // ref={inputRef}
        /> */}

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
