import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '~/src/components/ui/button';
import { Input } from '~/src/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, Mail, ChevronRight } from 'lucide-react';
import type { FooterProps } from './types';

export const NewsletterForm: React.FC<FooterProps> = ({
    newsletterTitle = "Se increva em nosso Grupo Especial",
    newsletterDescription = "Receba Informações Sobre os Últimos Lançamentos",
    newsletterButtonText = "Escreva-se",
    newsletterPlaceholder = "Seu Email",
    onNewsletterSubmit,
}) => {
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitSuccess, setSubmitSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Por favor, insira um email válido");
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (onNewsletterSubmit) {
                onNewsletterSubmit(email);
            } else {
                toast.success("🎉 Inscrição realizada com sucesso!", {
                    description: "Redirecionando para a página de confirmação...",
                    duration: 3000,
                    action: {
                        label: "Fechar",
                        onClick: () => { }
                    },
                });

                setSubmitSuccess(true);

                setTimeout(() => {
                    navigate("/newsletter", {
                        state: { email },
                    });
                }, 3500);
            }
        } catch (error) {
            toast.error("Ocorreu um erro", {
                description: "Por favor, tente novamente mais tarde.",
            });
        } finally {
            setIsSubmitting(false);
            if (!onNewsletterSubmit) {
                setEmail("");
            }
        }
    };

    return (
        <div className="lg:col-span-3 flex flex-col space-y-5">
            <h3 className="text-xs font-medium uppercase tracking-wider">{newsletterTitle}</h3>
            <p className="text-sm font-extralight text-muted-foreground">{newsletterDescription}</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div className="flex">
                    <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={newsletterPlaceholder}
                            className="pl-10 h-10 font-extralight text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                            required
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="h-10 w-full transition-all"
                    size="sm"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
                        </>
                    ) : submitSuccess ? (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Inscrito!
                        </>
                    ) : (
                        <>
                            <span className="text-xs font-light">{newsletterButtonText}</span>
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};
