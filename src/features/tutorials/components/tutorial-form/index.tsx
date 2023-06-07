import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { GrDocumentPdf } from 'react-icons/gr';
import { ControlledSelect, Input } from '@/components/form-fields';
import { TutorialPayload, File, Tutorial } from '../../type';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';

interface TutorialFromProps {
  defaultValues?: TutorialPayload;
  onSubmit: (data: TutorialPayload) => void;
  isSubmitting: boolean;
  editTutorial?: Tutorial;
}

export function TutorialForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  editTutorial,
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
      name: editTutorial?.name ?? '',
      category_id: {
        label: editTutorial?.category?.name ?? 'Escolha uma categoria',
        value: editTutorial?.category?.id ?? '',
      },
      ...defaultValues,
    },
  });

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoryTutorial();

  const categoryOptions = categories?.map((category) => ({
    label: category?.name,
    value: category?.id,
  }));

  const [fileName, setFileName] = useState<File>();

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleDrop = (event: any) => {
    event.preventDefault();
    setFileName(event.dataTransfer.files[0]);
  };

  if (fileName) {
    nomeArquivo = fileName.name;
  } else {
    nomeArquivo = editTutorial?.filename;
  }

  const defaultTutorial = (category: CategoryTutorial | undefined) => {
    return {
      label: category?.name ?? '',
      value: category?.id ?? '',
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Input
        label="Nome do tutorial"
        {...register('name', { required: 'Campo obrigatório' })}
        placeholder="Digite o nome do tutorial"
        errors={errors?.name}
      />

      <div style={{ marginTop: '5px' }}>
        <ControlledSelect
          control={control}
          name="category_id"
          id="category_id"
          options={categoryOptions}
          isLoading={isLoadingCategories}
          label="Categoria"
          defaultValue={isEditing && defaultTutorial(editTutorial?.category)}
          rules={{ required: 'Campo obrigatório' }}
        />
      </div>

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
            accept="application/pdf"
            placeholder="Escolha um arquivo e jogue"
            errors={errors?.file}
            onChange={(event) => {
              const { files } = event.target;
              if (files) {
                setFileName(files[0]);
              }
            }}
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
          {isEditing ? 'Salvar Tutorial' : 'Criar Tutorial'}
        </Button>
      </div>
    </form>
  );
}
