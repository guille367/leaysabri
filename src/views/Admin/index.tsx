'use client'

import { useState, useEffect } from 'react'
import './styles.scss'
import { getGuests } from '@/lib/dynamodb'
import { STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR } from 'next/dist/lib/constants'

const ADMIN_PASSWORD = 'LEASABRIW'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    confirmado: boolean
    createdAt: string
    updatedAt: string
}

function generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export type AdminFormTypes = {
    initialGuests: Guest[]
}

export default function Admin({ initialGuests = [] }: AdminFormTypes) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [statFilter, setStatFilter] = useState<'all' | 'confirmed' | 'pending' | 'guests' | null>(null)
    const [newGuest, setNewGuest] = useState({
        name: '',
        guestsAmount: 0,
        guests: [] as string[],
        code: '',
    })
    const [guests, setGuests] = useState(initialGuests);

    const confirmedGuests = guests.reduce((acc, curr, index) => {
        if (!curr.confirmado) {
            return acc;
        }

        return acc + 1 + curr.guests.filter(g => g !== '').length;
    }, 0)

    // Check for existing session on mount
    useEffect(() => {
        setNewGuest(prev => ({ ...prev, code: generateCode() }))
        const session = localStorage.getItem('admin_session')
        if (session === 'authenticated') {
            setIsAuthenticated(true)
        }
    }, [])
    const [saving, setSaving] = useState(false)

    const baseUrl = 'https://bodaleanysabri.com'

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            setLoginError(false)
            localStorage.setItem('admin_session', 'authenticated')
        } else {
            setLoginError(true)
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('admin_session')
    }


    const deleteGuest = async (id: string, code: string) => {
        if (!confirm('¿Estás seguro de eliminar este invitado?')) return

        try {
            const response = await fetch('/api/guests', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, code }),
            })

            if (response.ok) {
                setGuests(guests.filter(g => g.id !== id))
            }
        } catch (err) {
            console.error('Error deleting guest:', err)
        }
    }

    const addGuest = async () => {
        if (!newGuest.name.trim()) return


        setSaving(true)
        try {
            const response = await fetch('/api/guests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newGuest.name,
                    guestsAmount: newGuest.guestsAmount,
                    guests: newGuest.guests.slice(0, newGuest.guestsAmount),
                    dietaryRestrictions: '',
                    code: newGuest.code,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                setGuests([...guests, data.guest])
                setModalOpen(false)
                setNewGuest({
                    name: '',
                    guestsAmount: 0,
                    guests: [],
                    code: generateCode(),
                })
            }
        } catch (err) {
            console.error('Error adding guest:', err)
        } finally {
            setSaving(false)
        }
    }

    const openAddModal = () => {
        setNewGuest({
            name: '',
            guestsAmount: 0,
            guests: [],
            code: generateCode(),
        })
        setModalOpen(true)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    // const confirmedGuests = guests.filter(g => g.confirmado)
    const pendingGuests = guests.filter(g => !g.confirmado)

    const stats = {
        total: guests.length,
        confirmed: confirmedGuests,
        pending: pendingGuests.length,
        totalPeople: guests.reduce((acc, g) => acc + 1 + g.guestsAmount, 0),
    }



    const getInvitationLink = (guest: Guest) => `${baseUrl}?code=${guest.code}`;

    const filteredGuests = guests.filter(guest => {
        // Search filter
        const query = searchQuery.toLowerCase().trim()
        if (query) {
            const nameMatch = guest.name.toLowerCase().includes(query)
            const guestsMatch = guest.guests.some(g => g.toLowerCase().includes(query))
            if (!nameMatch && !guestsMatch) return false
        }

        // Stat filter
        if (statFilter === 'confirmed') return guest.confirmado
        if (statFilter === 'pending') return !guest.confirmado

        return true
    })

    const handleStatClick = (filter: 'all' | 'confirmed' | 'pending' | 'guests') => {
        setStatFilter(prev => prev === filter ? null : filter)
    }

    if (!isAuthenticated) {
        return (
            <main className="admin admin--login">
                <div className="admin__login-container">
                    <h1 className="admin__login-title">Acceso Administrador</h1>
                    <form onSubmit={handleLogin} className="admin__login-form">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setLoginError(false)
                            }}
                            placeholder="Contraseña"
                            className={`admin__login-input ${loginError ? 'admin__login-input--error' : ''}`}
                            autoFocus
                        />
                        {loginError && (
                            <p className="admin__login-error">Contraseña incorrecta</p>
                        )}
                        <button type="submit" className="admin__login-button">
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
        )
    }

    return (
        <main className="admin">
            <div className="admin__header">
                <h1 className="admin__title">Gestión de Invitados</h1>
                <div className="admin__header-actions">
                    <button className="admin__add" onClick={openAddModal}>
                        + Agregar invitado
                    </button>
                    <button className="admin__logout" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </div>

            <div className="admin__stats">
                <div
                    className={`admin__stat ${statFilter === 'all' ? 'admin__stat--active' : ''}`}
                    onClick={() => handleStatClick('all')}
                >
                    <span className="admin__stat-value">{stats.total}</span>
                    <span className="admin__stat-label">Invitaciones</span>
                </div>
                <div
                    className={`admin__stat admin__stat--confirmed ${statFilter === 'confirmed' ? 'admin__stat--active' : ''}`}
                    onClick={() => handleStatClick('confirmed')}
                >
                    <span className="admin__stat-value">{stats.confirmed}</span>
                    <span className="admin__stat-label">Invitados confirmados + acompañantes</span>
                </div>
                <div
                    className={`admin__stat admin__stat--pending ${statFilter === 'pending' ? 'admin__stat--active' : ''}`}
                    onClick={() => handleStatClick('pending')}
                >
                    <span className="admin__stat-value">{stats.pending}</span>
                    <span className="admin__stat-label">Invitaciones pendientes de confirmación</span>
                </div>
                <div
                    className={`admin__stat admin__stat--guests ${statFilter === 'guests' ? 'admin__stat--active' : ''}`}
                    onClick={() => handleStatClick('guests')}
                >
                    <span className="admin__stat-value">{stats.totalPeople}</span>
                    <span className="admin__stat-label">Total personas invitadas</span>
                </div>
            </div>

            <div className="admin__search">
                <input
                    type="text"
                    placeholder="Buscar por nombre o invitado..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin__search-input"
                />
                {(searchQuery || statFilter) && (
                    <button
                        className="admin__search-clear"
                        onClick={() => { setSearchQuery(''); setStatFilter(null); }}
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {loading ? (
                <div className="admin__loading">Cargando...</div>
            ) : error ? (
                <div className="admin__error">{error}</div>
            ) : (
                <div className="admin__table-container">
                    <table className="admin__table">
                        <thead>
                            <tr>
                                <th>Invitado</th>
                                <th>Cantidad de acompañantes</th>
                                <th>Acompañantes</th>
                                <th>Restricciones</th>
                                <th>Confirmado</th>
                                <th>Link</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGuests.map(guest => (
                                <tr key={guest.id} className="admin__row">
                                    <td>{guest.name}</td>
                                    <td>{guest.guestsAmount}</td>
                                    <td>{guest.guests.length > 0 ? guest.guests.join(', ') : '-'}</td>
                                    <td>{guest.dietaryRestrictions || '-'}</td>
                                    <td>
                                        <span className={`admin__status ${guest.confirmado ? 'admin__status--confirmed' : 'admin__status--pending'}`}>
                                            {guest.confirmado ? 'Si' : 'No'}
                                        </span>
                                    </td>
                                    <td>
                                        {guest.code ? (
                                            <div className="admin__link-cell">
                                                <button
                                                    className="admin__copy-link"
                                                    onClick={() => copyToClipboard(getInvitationLink(guest))}
                                                    title="Copiar link"
                                                >
                                                    Copiar link de invitación
                                                </button>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        <button
                                            className="admin__delete"
                                            onClick={() => deleteGuest(guest.id, guest.code)}
                                            aria-label="Eliminar"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredGuests.length === 0 && (
                        <div className="admin__empty">
                            {guests.length === 0 ? 'No hay invitados' : 'No se encontraron resultados'}
                        </div>
                    )}
                </div>
            )}

            {/* Add Guest Modal */}
            {modalOpen && (
                <div className="admin__modal" onClick={() => setModalOpen(false)}>
                    <div className="admin__modal-content" onClick={e => e.stopPropagation()}>
                        <button
                            className="admin__modal-close"
                            onClick={() => setModalOpen(false)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="admin__modal-title">Agregar Invitado</h2>

                        <div className="admin__modal-form">
                            <div className="admin__modal-field">
                                <label>Invitado</label>
                                <input
                                    type="text"
                                    value={newGuest.name}
                                    onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
                                    placeholder="Nombre del invitado"
                                    autoFocus
                                />
                            </div>

                            <div className="admin__modal-field">
                                <label>Cantidad de acompañantes</label>
                                <select
                                    value={newGuest.guestsAmount}
                                    onChange={e => {
                                        const amount = parseInt(e.target.value)
                                        const currentGuests = [...newGuest.guests]
                                        // Resize array: keep existing names, pad with empty strings
                                        while (currentGuests.length < amount) currentGuests.push('')
                                        setNewGuest({ ...newGuest, guestsAmount: amount, guests: currentGuests.slice(0, amount) })
                                    }}
                                >
                                    {[0, 1, 2, 3, 4, 5].map(n => (
                                        <option key={n} value={n}>{n === 0 ? 'sin acompañantes' : n}</option>
                                    ))}
                                </select>
                            </div>

                            {newGuest.guestsAmount > 0 && (
                                <div className="admin__modal-field">
                                    <label>Nombres de acompañantes</label>
                                    {Array.from({ length: newGuest.guestsAmount }).map((_, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            value={newGuest.guests[i] || ''}
                                            onChange={e => {
                                                const updated = [...newGuest.guests]
                                                updated[i] = e.target.value
                                                setNewGuest({ ...newGuest, guests: updated })
                                            }}
                                            placeholder={`Acompañante ${i + 1}`}
                                            style={{ marginTop: i > 0 ? '0.5rem' : 0 }}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="admin__modal-field">
                                <label>Código</label>
                                <input
                                    type="text"
                                    value={newGuest.code}
                                    disabled
                                    className="admin__modal-input--disabled"
                                />
                            </div>

                            <div className="admin__modal-field">
                                <label>Link</label>
                                <input
                                    type="text"
                                    value={getInvitationLink(newGuest as Guest)}
                                    disabled
                                    className="admin__modal-input--disabled"
                                />
                            </div>

                            <button
                                className="admin__modal-submit"
                                onClick={addGuest}
                                disabled={saving || !newGuest.name.trim()}
                            >
                                {saving ? 'Guardando...' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
