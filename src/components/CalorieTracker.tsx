import { useMemo } from "react"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // counters
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) =>
        activity.category === 1 ? total + activity.calories : total, 0)
        , [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) =>
        activity.category === 2 ? total + activity.calories : total, 0)
        , [activities])

    const netCalories = useMemo(() =>
        caloriesConsumed - caloriesBurned
        , [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorías</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-5 md:mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
