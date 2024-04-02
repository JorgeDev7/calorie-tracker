import { useState, ChangeEvent, useMemo, FormEvent, Dispatch } from "react"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState = {
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    const validateInputText = useMemo(() => {
        return activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'
    }, [activity.category])

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;

        return name.trim() !== "" && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({
            type: 'save-activity',
            payload: { newActivity: activity }
        });
        setActivity(initialState);
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="category"
                    className="font-bold"
                >Categoría:</label>
                <select
                    name="category"
                    id="category"
                    className="border boder-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChangeSelect}
                >
                    {categories.map(categorie => (
                        <option
                            key={categorie.id}
                            value={categorie.id}
                        >{categorie.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="name"
                    className="font-bold"
                >Actividad:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChangeSelect}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="calories"
                    className="font-bold"
                >Calorías:</label>
                <input
                    type="number"
                    name="calories"
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorías ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChangeSelect}
                    min={0}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
                value={validateInputText}
                disabled={!isValidActivity() ? true : false}
            />
        </form>
    )
}
