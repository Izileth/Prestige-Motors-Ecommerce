import type React from "react";
import { motion } from "framer-motion";
import { Textarea } from "~/components/ui/textarea";
import { User, Star, Edit2, Trash2, MessageSquare, Loader2 } from "lucide-react";
import type { Review, ReviewCreateInput, ReviewUpdateInput } from "~/types/reviews";
import type { User as UserType } from "~/types/user";

interface VehicleReviewsProps {
  reviews: Review[];
  user: UserType | null;
  reviewForm: {
    mode: 'create' | 'edit';
    data: ReviewCreateInput | ReviewUpdateInput;
    editingId?: string;
  };
  isPostingReview: boolean;
  onReviewSubmit: (e: React.FormEvent) => void;
  onEditReview: (review: Review) => void;
  onDeleteReview: (reviewId: string) => void;
  onReviewFormChange: (field: string, value: any) => void;
  onCancelEdit: () => void;
  onNavigateToLogin: () => void;
}

const VehicleReviews: React.FC<VehicleReviewsProps> = ({
  reviews,
  user,
  reviewForm,
  isPostingReview,
  onReviewSubmit,
  onEditReview,
  onDeleteReview,
  onReviewFormChange,
  onCancelEdit,
  onNavigateToLogin,
}) => {
  return (
    <div className="mt-4 space-y-6">
      <div className="max-w-full  mx-auto ">
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-6 pl-4">
            <h2 className="text-2xl font-light text-gray-900 mb-2 ">Avaliações</h2>
            <p className="text-gray-600 text-sm">{reviews?.length || 0} avaliações</p>
          </div>

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Faça login para avaliar</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Você precisa estar logado para deixar uma avaliação.
                  </p>
                  <button
                    className="text-sm text-gray-900 hover:text-gray-700 underline underline-offset-2 transition-colors"
                    onClick={onNavigateToLogin}
                  >
                    Clique aqui para fazer login
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                        {review.user?.avatar ? (
                          <img
                            src={review.user.avatar}
                            alt={review.user.nome}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-medium">
                            {review.user?.nome.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.user?.nome}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt)?.toLocaleDateString("pt-BR")}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "fill-gray-900 text-gray-900"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>

                        {review.comentario && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {review.comentario}
                          </p>
                        )}

                        {(review.userId === user?.id || user?.role === 'ADMIN') && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onEditReview(review)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                            >
                              <Edit2 size={12} />
                              Editar
                            </button>
                            <button
                              onClick={() => onDeleteReview(review.id)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                              Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium mb-1">Nenhuma avaliação ainda</p>
                <p className="text-gray-400 text-sm">Seja o primeiro a avaliar este veículo</p>
              </div>
            )}
          </div>

          <div id="review-form" className="border-t border-gray-200 pt-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {reviewForm.mode === 'edit' ? 'Editar avaliação' : 'Deixe sua avaliação'}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sua avaliação
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => onReviewFormChange('rating', star)}
                        className="focus:outline-none transition-transform hover:scale-110 p-1"
                      >
                        <Star
                          size={20}
                          className={
                            star <= reviewForm.data.rating
                              ? "fill-gray-900 text-gray-900"
                              : "text-gray-300 hover:text-gray-400"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-3">
                    Comentário (opcional)
                  </label>
                  <Textarea
                    id="comment"
                    value={reviewForm.data.comentario || ""}
                    onChange={(e) => onReviewFormChange('comentario', e.target.value)}
                    placeholder="Conte sua experiência com este veículo..."
                    rows={4}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm transition-colors"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onReviewSubmit}
                    disabled={isPostingReview}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isPostingReview && <Loader2 className="animate-spin" size={16} />}
                    {reviewForm.mode === 'edit' ? 'Atualizar avaliação' : 'Enviar avaliação'}
                  </button>

                  {reviewForm.mode === 'edit' && (
                    <button
                      type="button"
                      onClick={onCancelEdit}
                      className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReviews;
