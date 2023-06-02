import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  HStack,
  useDisclosure,
  Input,
  Icon,
  Tooltip,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/all';
import { FaSearch } from 'react-icons/fa';
import { CategoryTutorialItem } from '@/features/categories-tutorial/components/category-tutorial-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { CategoryTutorialModal } from '@/features/categories-tutorial/components/category-tutorial-modal/category-tutorial-modal';
import { useGetAllCategoryTutorial } from '@/features/categories-tutorial/api/get-all-categories-tutorial';
import { useDeleteCategoryTutorial } from '@/features/categories-tutorial/api/delete-category-tutorial';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';
import { Permission } from '@/components/permission';

export function GerenciarHomologacao() {

  return (
    <>
      <PageHeader title="Homologação">

      </PageHeader>
    </>
  );
}