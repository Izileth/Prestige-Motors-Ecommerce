import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Button } from "~/src/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/src/components/ui/alert";
import VehicleDetailsSkeleton from "~/src/components/layout/skeleton/VehicleDetailsSkeleton";
import { X, ChevronLeft } from "lucide-react";

import useVehicle from "~/src/hooks/useVehicle";
import { useReviews } from "~/src/hooks/useReview";
import { useAuth } from "~/src/hooks/useAuth";

import type { ReviewCreateInput, ReviewUpdateInput, Review } from "~/src/types/reviews";
import type { VehicleError } from "~/src/types/vehicle";

import VehicleHeader from "~/src/components/pages/vehicle/id/VehicleHeader";
import VehicleImageGallery from "~/src/components/pages/vehicle/id/VehicleImageGallery";
import VehicleInfo from "~/src/components/pages/vehicle/id/VehicleInfo";
import VehicleDetails from "~/src/components/pages/vehicle/id/VehicleDetails";
import VehicleSidebar from "~/src/components/pages/vehicle/id/VehicleSidebar";
import VehicleReviews from "~/src/components/pages/vehicle/id/VehicleReviews";
import VehicleRecommendationsGrid from "~/src/components/pages/vehicle/id/VehicleRadomGrid";

import { toast } from "sonner"
;
const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const {
    currentVehicle,
    favorites,
    loading,
    error,
    fetchVehicleById,
    addFavorite,
    removeFavorite,
    fetchUserFavorites,
  } = useVehicle();

  const { createReview: createVehicleReview, updateReview, deleteReview } = useReviews(id);

  const [reviewForm, setReviewForm] = useState<{
    mode: 'create' | 'edit';
    data: ReviewCreateInput | ReviewUpdateInput;
    editingId?: string;
  }>({ 
    mode: 'create',
    data: {
      vehicleId: id !== undefined ? id : "",
      rating: 5,
      comentario: "",
    }
  });

  const [isPostingReview, setIsPostingReview] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vehicleError, setVehicleError] = useState<VehicleError | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadData = async () => {
      try {
        await fetchVehicleById(id);
        if (isMounted) {
          await fetchUserFavorites();
        }
      } catch (error) {
        if (isMounted) console.error("Failed to load vehicle data:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFavorite = (vehicleId: string) => {
    return Array.isArray(favorites) && favorites.some((v) => v.id === vehicleId);
  };

  const toggleFavorite = async () => {
    if (!currentVehicle) return;

    try {
      if (isFavorite(currentVehicle.id)) {
        await removeFavorite(currentVehicle.id);
      } else {
        await addFavorite(currentVehicle.id);
      }
      await fetchUserFavorites();
      setVehicleError(null);
    } catch (err) {
      const error = err as Error;
      
      if (error.message === 'User not authenticated') {
        setVehicleError({
          message: 'Você precisa fazer login para adicionar aos favoritos',
          type: 'auth'
        });
      } else {
        setVehicleError({
          message: 'Ocorreu um erro ao atualizar seus favoritos',
          type: 'api'
        });
        console.error("Erro ao atualizar favoritos:", error);
      }
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsPostingReview(true);
      
      if (reviewForm.mode === 'create') {
        await createVehicleReview({ 
            vehicleId: id,
            rating: reviewForm.data.rating,
            comentario: reviewForm.data.comentario
        });
      } else if (reviewForm.mode === 'edit' && reviewForm.editingId) {
        await updateReview(reviewForm.editingId, {
          ...reviewForm.data,
          id: reviewForm.editingId
        });
      }
      
      setReviewForm({
        mode: 'create',
        data: { vehicleId: id, rating: 5, comentario: "" }
      });
      setVehicleError(null);
      
      await fetchVehicleById(id);
    } catch (error) {
      const err = error as Error;
      setVehicleError({
        message: err.message || 'Não foi possível enviar sua avaliação',
        type: 'api'
      });
    } finally {
      setIsPostingReview(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setReviewForm({
      mode: 'edit',
      data: {
        vehicleId: review.vehicleId,
        rating: review.rating,
        comentario: review.comentario || ""
      },
      editingId: review.id
    });
    
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    
    try {
      await deleteReview(reviewId);
      if (id) {
        await fetchVehicleById(id);
      } else {
        console.error("id is undefined");
      }
      setVehicleError(null);
    } catch (error) {
      const err = error as Error;
      setVehicleError({
        message: err.message || 'Não foi possível excluir a avaliação',
        type: 'api'
      });
    }
  };
 

  const handleShare = async () => {
    if (!currentVehicle) return;

    // Informações essenciais do veículo
    const { 
      marca, 
      modelo, 
      anoFabricacao, 
      anoModelo, 
      cor, 
      preco, 
      quilometragem 
    } = currentVehicle;

    const shareUrl = window.location.href;
    const shareTitle = `${marca} ${modelo} (${anoFabricacao}/${anoModelo})`;
    
    // Texto formatado com informações principais
    const shareText = `🚗 ${marca} ${modelo} (${anoFabricacao}/${anoModelo})
    
    📍 Principais informações:
    ✔️ ${preco ? `R$ ${preco.toLocaleString('pt-BR')}` : 'Preço sob consulta'}
    ✔️ ${quilometragem ? `${quilometragem.toLocaleString('pt-BR')} km` : 'KM não informada'}
    ✔️ Cor: ${cor || 'Não especificada'}

    🔗 Ver mais detalhes: ${shareUrl}`;

    // Dados para compartilhamento
    const shareData: ShareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl
    };

    try {
      // Tenta usar a API de compartilhamento nativo
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para copiar para área de transferência
        await navigator.clipboard.writeText(`${shareText}`);
        toast.success("Informações do veículo copiadas para a área de transferência!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      // Fallback alternativo
      prompt("Copie as informações do veículo:", shareText);
      toast.error("Falha ao compartilhar, copiado para área de transferência!");
    }
  };

  // Handler para clicar em uma recomendação
  const handleRecommendationClick = (vehicle: any) => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  if (loading) return <VehicleDetailsSkeleton />;

  if (vehicleError) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-md">
        <Alert variant={vehicleError.type === 'auth' ? 'default' : 'destructive'}>
          <div className="flex justify-between items-start">
            <div>
              <AlertTitle>
                {vehicleError.type && 'auth'}
              </AlertTitle>
              <AlertDescription>
                {vehicleError.message}
                {vehicleError.type === 'auth' && (
                  <Button
                    variant="link"
                    className="h-auto p-0 ml-2 text-inherit underline"
                    onClick={() => navigate('/login', { state: { from: location.pathname } })}
                  >
                    Fazer login
                  </Button>
                )}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setVehicleError(null)}
            >
              <X size={16} />
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8  text-center">
          <div className="text-red-500 mb-4 text-lg">Erro ao carregar o veículo</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft size={16} className="mr-2" /> Voltar
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentVehicle) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="max-w-md w-full p-8 text-center">
          <div className="text-gray-900 dark:text-gray-100 mb-4 text-lg">Veículo não encontrado</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            O veículo que você está procurando não está disponível ou foi removido.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ChevronLeft size={16} className="mr-2" /> Voltar para a listagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pb-16 md:px-6">
      <VehicleHeader
        isFavorite={isFavorite(currentVehicle.id)}
        scrolled={scrolled}
        onToggleFavorite={toggleFavorite}
        onShare={handleShare}
      />

      <div className="container mx-auto px-4 pt-4">
        <VehicleInfo vehicle={currentVehicle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VehicleImageGallery vehicle={currentVehicle} />
            <VehicleDetails vehicle={currentVehicle} />
            <VehicleReviews
              reviews={currentVehicle.avaliacoes || []}
              user={user}
              reviewForm={reviewForm}
              isPostingReview={isPostingReview}
              onReviewSubmit={handleReviewSubmit}
              onEditReview={handleEditReview}
              onDeleteReview={handleDeleteReview}
              onReviewFormChange={(field, value) =>
                setReviewForm((prev) => ({ ...prev, data: { ...prev.data, [field]: value } }))
              }
              onCancelEdit={() =>
                setReviewForm({
                  mode: 'create',
                  data: { vehicleId: id || "", rating: 5, comentario: "" },
                })
              }
              onNavigateToLogin={() => navigate("/login", { state: { from: location.pathname } })}
            />
          </div>
          <VehicleSidebar vehicle={currentVehicle} />
        </div>

        {/* Grid de Recomendações */}
        <div className="mt-12 mb-8">
          <VehicleRecommendationsGrid 
            currentVehicle={currentVehicle}
            onVehicleClick={handleRecommendationClick}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;