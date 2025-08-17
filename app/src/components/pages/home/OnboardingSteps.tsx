import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { steps } from "~/src/data/steps"


export function OnboardingSteps() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })
    
    return (
        <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-full px-6 lg:px-8">
            <div className="mx-auto max-w-full text-center">
                <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-zinc-950 w-20 dark:bg-gray-100 mx-auto mb-6"
            />
            <h2 className="text-3xl uppercase  font-light tracking-tight text-gray-900 sm:text-6xl">Configuração de Conta e Perfil</h2>
            <p className="mt-4 text-lg text-gray-600">
                Comece a usar em três etapas fáceis. Nenhuma experiência técnica necessária.
            </p>
            </div>

            <div className="mx-auto w-full max-w-full mt-16 flex flex-col justify-center items-center">
            <div className="relative">
                {/* Progress line */}
                <div className="absolute left-8 top-8 h-full w-0.5 bg-gray-200" />

                <div className="space-y-12">
                {steps.map((step, stepIdx) => (
                    <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: stepIdx * 0.2 }}
                    className="relative flex items-start"
                    >
                    {/* Step indicator */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                        {step.status === "complete" ? (
                        <CheckCircle className="h-8 w-8 text-gray-600" />
                        ) : (
                        <step.icon
                            className={`h-8 w-8 ${step.status === "current" ? "text-gray-900" : "text-gray-400"}`}
                        />
                        )}
                    </div>

                    {/* Step content */}
                    <div className="ml-8 min-w-0 flex-1">
                        <div className="flex items-center">
                        <h3
                            className={`text-xl font-semibold ${
                            step.status === "current" ? "text-gray-900" : "text-gray-700"
                            }`}
                        >
                            Step {step.id}: {step.name}
                        </h3>
                        {step.status === "completo" && (
                            <span className="ml-3 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Desativado
                            </span>
                        )}
                        {step.status === "aberto" && (
                            <span className="ml-3 inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                                Ativado
                            </span>
                        )}
                        </div>
                        <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}
