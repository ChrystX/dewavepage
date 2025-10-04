import { useEffect, useState } from "react";
import InstructorDashboardHeader from "../admin_component/instructor/admin_instructor_header.jsx";
import InstructorStatsCards from "../admin_component/instructor/admin_instructor_statscard.jsx";
import InstructorFilters from "../admin_component/instructor/admin_instructor_filters.jsx";
import InstructorTable from "../admin_component/instructor/admin_instructor_table.jsx";
import InstructorModal from "../admin_component/instructor/admin_instructor_modal.jsx";

const AdminInstructorDashboard = () => {
    const [instructors, setInstructors] = useState([]);
    const [filteredInstructors, setFilteredInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [certificationFilter, setCertificationFilter] = useState('all');
    const [contactFilter, setContactFilter] = useState('all');
    const [message, setMessage] = useState({ type: '', text: '' });

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        imageUrl: '',
        contactEmail: '',
        phoneNumber: '',
        certifications: ''
    });

    const INSTRUCTORS_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/instructors';

    // Fetch instructors
    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const res = await fetch(INSTRUCTORS_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setInstructors(data);
            setFilteredInstructors(data);
            setMessage({ type: 'success', text: `Loaded ${data.length} instructors successfully` });
            console.log('✅ Instructors fetched successfully:', data);
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to load instructors' });
            setInstructors([]);
            setFilteredInstructors([]);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    // Create or update instructor
    const submitInstructor = async () => {
        if (!formData.name.trim()) {
            alert('Name is required');
            return;
        }

        try {
            const payload = { ...formData };
            const url = modalMode === 'create'
                ? INSTRUCTORS_API_URL
                : `${INSTRUCTORS_API_URL}/${selectedInstructor.id}`;
            const method = modalMode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save instructor');

            setMessage({ type: 'success', text: `Instructor ${modalMode === 'create' ? 'created' : 'updated'} successfully` });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);

            await fetchInstructors();
            closeModal();
        } catch (err) {
            console.error(err);
            alert('Failed to save instructor');
        }
    };

    // Delete instructor
    const deleteInstructor = async (id) => {
        if (!window.confirm('Are you sure you want to delete this instructor?')) return;

        try {
            const res = await fetch(`${INSTRUCTORS_API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete instructor');

            setMessage({ type: 'success', text: 'Instructor deleted successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);

            setInstructors(prev => prev.filter(i => i.id !== id));
            setFilteredInstructors(prev => prev.filter(i => i.id !== id));
            closeModal();
        } catch (err) {
            console.error(err);
            alert('Failed to delete instructor');
        }
    };

    // Modal functions
    const openModal = (mode, instructor = null) => {
        setModalMode(mode);
        setSelectedInstructor(instructor);
        setFormData(instructor ? { ...instructor } : {
            name: '',
            bio: '',
            imageUrl: '',
            contactEmail: '',
            phoneNumber: '',
            certifications: ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInstructor(null);
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...instructors];

        if (searchTerm) {
            filtered = filtered.filter(i =>
                i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (i.contactEmail && i.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (i.bio && i.bio.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (certificationFilter === 'certified') {
            filtered = filtered.filter(i => i.certifications);
        } else if (certificationFilter === 'uncertified') {
            filtered = filtered.filter(i => !i.certifications);
        }

        if (contactFilter === 'email') {
            filtered = filtered.filter(i => i.contactEmail);
        } else if (contactFilter === 'phone') {
            filtered = filtered.filter(i => i.phoneNumber);
        } else if (contactFilter === 'both') {
            filtered = filtered.filter(i => i.contactEmail && i.phoneNumber);
        } else if (contactFilter === 'none') {
            filtered = filtered.filter(i => !i.contactEmail && !i.phoneNumber);
        }

        setFilteredInstructors(filtered);
    }, [instructors, searchTerm, certificationFilter, contactFilter]);

    const refreshData = async () => {
        await fetchInstructors();
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Header */}
            <InstructorDashboardHeader
                title="Instructors"
                onRefresh={refreshData}
                onAdd={() => openModal('create')}
                loading={loading}
                addLabel="Add Instructor"
            />

            {/* Message */}
            {message.text && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Stats */}
            <InstructorStatsCards instructors={instructors} />

            {/* Filters */}
            <InstructorFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                certificationFilter={certificationFilter}
                setCertificationFilter={setCertificationFilter}
                contactFilter={contactFilter}
                setContactFilter={setContactFilter}
            />

            {/* Table */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-22">
                <InstructorTable
                    instructors={filteredInstructors}
                    onView={(instructor) => openModal('view', instructor)}
                    onEdit={openModal}
                    onDelete={deleteInstructor}
                    onAdd={() => openModal('create')}
                />
            </div>

            {/* Modal */}
            <InstructorModal
                isOpen={isModalOpen}
                mode={modalMode}
                instructor={selectedInstructor}
                formData={formData}
                setFormData={setFormData}
                onSubmit={submitInstructor}
                onClose={closeModal}
                onEdit={(instructor) => openModal('edit', instructor)}
                onDelete={deleteInstructor}
            />
        </div>
    );
};

export default AdminInstructorDashboard;
