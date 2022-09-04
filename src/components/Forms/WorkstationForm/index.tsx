import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaTrash } from "react-icons/fa"
import { MdLibraryAdd } from "react-icons/md"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react"

import { ControlledSelect } from "@components/ControlledSelect"
import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { getRegionais } from "@services/Workstation"
import { getSelectOptions } from "@utils/getSelectOptions"

interface WorkstationFormProps {
  defaultValues?: Workstation | undefined
  onSubmit: (data: CreateWorkstationPayload) => void
}

type check = {
  adsl_vpn: boolean | null
  regional: boolean | null
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit
}: WorkstationFormProps) => {
  const { data: cidades, isLoading: isLoadingCidades } =
    useRequest<Workstation[]>(getCities)
  const { data: regionais, isLoading: isLoadingRegionais } =
    useRequest<Workstation[]>(getRegionais)

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateWorkstationPayload>({
    defaultValues: {
      ...defaultValues
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones"
  })

  const [CBox, setCBox] = useState<check>({
    adsl_vpn: watch("adsl_vpn"),
    regional: watch("regional")
  })

  const setVPN = () => {
    setCBox({ adsl_vpn: !CBox.adsl_vpn, regional: CBox.regional })
    reset({ link: undefined, ip: undefined })
  }

  const setRegional = () => {
    setCBox({ adsl_vpn: CBox.adsl_vpn, regional: !CBox.regional })
    reset({ regional_id: undefined })
  }

  console.log(watch(`phones`))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.keys(errors).length > 0} mb={8}>
        <Stack spacing={8}>
          <Flex gap={8}>
            <Box w="100%">
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                {...register("name", { required: "Campo obrigatório" })}
                placeholder="Nome"
                variant="flushed"
              />
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </Box>
            <FormLabel htmlFor="asdl_vpn"></FormLabel>

            <Stack spacing={5} direction="row" w={"100%"}>
              <Stack spacing={5} direction="row">
                <Checkbox
                  colorScheme="orange"
                  {...register("adsl_vpn", {
                    onChange() {
                      setVPN()
                    }
                  })}
                >
                  ADSL/VPN
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  {...register("regional", {
                    onChange() {
                      setRegional()
                    }
                  })}
                >
                  Regional
                </Checkbox>
              </Stack>
            </Stack>
            {errors?.adsl_vpn && (
              <FormErrorMessage>{errors?.adsl_vpn?.message}</FormErrorMessage>
            )}
          </Flex>

          {CBox.adsl_vpn ? (
            <></>
          ) : (
            <Flex gap={8}>
              <Box w="100%">
                <FormLabel htmlFor="Link">Link</FormLabel>
                <Input
                  {...register("link", {
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  })}
                  placeholder="00.00.000.1"
                  variant="flushed"
                />
                {errors?.link && (
                  <FormErrorMessage>{errors?.link?.message}</FormErrorMessage>
                )}
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="ip">Faixa de IP</FormLabel>
                <Input
                  {...register("ip", {
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  })}
                  placeholder="00.000.00.2 a 00.00.000.3"
                  variant="flushed"
                />
                {errors?.ip && (
                  <FormErrorMessage>{errors?.ip?.message}</FormErrorMessage>
                )}
              </Box>
            </Flex>
          )}

          <Flex gap={8}>
            {!CBox.regional ? (
              <Box w={"50%"}>
                <ControlledSelect
                  control={control}
                  name="regional_id"
                  id="regional_id"
                  options={getSelectOptions(regionais?.data, "name", "id")}
                  isLoading={isLoadingRegionais}
                  placeholder="Regional"
                  label="Regional"
                  rules={{
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  }}
                />
              </Box>
            ) : (
              <></>
            )}

            <Box w={"50%"}>
              <ControlledSelect
                control={control}
                name="city_id"
                id="city_id"
                options={getSelectOptions(cidades?.data, "name", "id")}
                isLoading={isLoadingCidades}
                placeholder="Cidade"
                label="Cidade"
                rules={{ required: "Campo obrigatório" }}
              />
            </Box>
          </Flex>
        </Stack>

        <Flex gap={8}>
          <Box w={"45%"} mt={"2em"}>
            <FormLabel htmlFor="phone">Telefones:</FormLabel>
            {fields?.map((phone, index) => {
              return (
                <Flex mt={"2em"} key={phone.id}>
                  <Box>
                    <FormLabel htmlFor={"phone"}>Telefone</FormLabel>
                    <Input
                      {...register(`phones.${index}.number` as const, {
                        required: "Campo obrigatório"
                      })}
                      placeholder="Novo Telefone"
                      variant="flushed"
                    />
                  </Box>

                  <Tooltip
                    label={`Tirar Telefone`}
                    placement="top"
                    bg="red.500"
                    color="white"
                    openDelay={250}
                    hasArrow
                  >
                    <Box mt={"2em"} ml={"1em"}>
                      <IconButton
                        aria-label="Delete"
                        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- precisa passar a key
                        onClick={() => remove(index)}
                        icon={<FaTrash />}
                        color="red.500"
                        variant="solid"
                      />
                    </Box>
                  </Tooltip>
                  {errors?.phones && (
                    <FormErrorMessage>
                      {errors?.phones?.message}
                    </FormErrorMessage>
                  )}
                </Flex>
              )
            })}
          </Box>
          <Text
            fontSize={"3xl"}
            w={"50%"}
            textAlign={"left"}
            alignSelf={"flex-end"}
          >
            <Tooltip
              label="Adicionar Telefone"
              placement="top"
              bg="gray.100"
              color="black"
              openDelay={250}
              hasArrow
            >
              <IconButton
                aria-label="Add"
                icon={<MdLibraryAdd cursor="pointer" size={24} />}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- eu de novo
                onClick={() => append([{ number: "" }])}
                variant="solid"
              />
            </Tooltip>
          </Text>
        </Flex>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}