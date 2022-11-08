import { useEffect, useState } from "react";
import { Share } from "react-native";
import { Heading, HStack, useToast, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";

interface RouteParams {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)
  const [optionsSelected, setOptionsSelected] = useState<'guesses' | 'ranking'>('guesses')

  const route = useRoute()
  const toast = useToast()

  const { id } = route.params as RouteParams

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [id])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {
        poolDetails._count?.participants > 0 ?
          <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionsSelected === 'guesses'}
                onPress={() => setOptionsSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionsSelected === 'ranking'}
                onPress={() => setOptionsSelected('ranking')}
              />
            </HStack>

            <Guesses poolId={poolDetails.id} code={poolDetails.code} />
          </VStack>
          : <EmptyMyPoolList code={poolDetails.code} />
      }

    </VStack>
  );
}