import { useState, useEffect, useMemo } from 'react';
import CourseModal from "../admin_component/course/admin_course_modal.jsx";
import CoursesTable from "../admin_component/course/admin_course_table.jsx";
import CourseFilters from "../admin_component/course/admin_course_filters.jsx";
import StatsCards from "../admin_component/course/admin_course_statscard.jsx";
import DashboardHeader from "../admin_component/course/admin_course_header.jsx";
import FaqModal from "../admin_component/course/faq_modal.jsx";
import CourseDetailModal from "../admin_component/course/course_detail_modal.jsx";
import CourseSectionModal from "../admin_component/course/course_section_modal.jsx";
import CoursePreviewModal from "../admin_component/course/course_preview.jsx";
import ManageCollaboratorsModal from "../admin_component/course/admin_course_collab_modal.jsx"; // NEW

const AdminCourseDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        videoCount: '',
        rating: '',
        image: '',
        instructorId: '',
        categoryId: '',
        isActive: true
    });
    const [faqModalOpen, setFaqModalOpen] = useState(false);
    const [faqModalMode, setFaqModalMode] = useState('create');
    const [faqFormData, setFaqFormData] = useState({ id:null, question:'', answer:'', sortOrder:0, courseId:null });
    const [selectedCourseFaqs, setSelectedCourseFaqs] = useState([]);

    // CourseDetail Modal states
    const [courseDetailModalOpen, setCourseDetailModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // CourseSection Modal states
    const [courseSectionModalOpen, setCourseSectionModalOpen] = useState(false);
    const [selectedCourseSectionId, setSelectedCourseSectionId] = useState(null);

    // Course Preview Modal states
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewCourse, setPreviewCourse] = useState(null);

    // NEW: Collaborators Modal states
    const [collaboratorsModalOpen, setCollaboratorsModalOpen] = useState(false);
    const [collaboratorsCourse, setCollaboratorsCourse] = useState(null);

    const closeFaqModal = () => {
        setFaqModalOpen(false);
        setFaqFormData({ id:null, question:'', answer:'', sortOrder:0, courseId:null });
    };

    // CourseDetail Modal functions
    const openCourseDetailModal = (courseId) => {
        setSelectedCourseId(courseId);
        setCourseDetailModalOpen(true);
    };

    const closeCourseDetailModal = () => {
        setCourseDetailModalOpen(false);
        setSelectedCourseId(null);
    };

    // CourseSection Modal functions
    const openCourseSectionModal = (courseId) => {
        setSelectedCourseSectionId(courseId);
        setCourseSectionModalOpen(true);
    };

    const closeCourseSectionModal = () => {
        setCourseSectionModalOpen(false);
        setSelectedCourseSectionId(null);
    };

    // CoursePreview Modal functions
    const openCoursePreview = (course) => {
        setPreviewCourse(course);
        setIsPreviewModalOpen(true);
    };

    const closeCoursePreview = () => {
        setIsPreviewModalOpen(false);
        setPreviewCourse(null);
    };

    // NEW: Collaborators Modal functions
    const openCollaboratorsModal = (course) => {
        setCollaboratorsCourse(course);
        setCollaboratorsModalOpen(true);
    };

    const closeCollaboratorsModal = () => {
        setCollaboratorsModalOpen(false);
        setCollaboratorsCourse(null);
    };

    const COURSES_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/courses';
    const CATEGORIES_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/categories';
    const FAQ_API_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api/CourseFaqs';

    // API calls
    const fetchCategories = async () => {
        try {
            const res = await fetch(CATEGORIES_API_URL);
            if (res.ok) setCategories(await res.json());
        } catch (err) { console.error('Error fetching categories:', err); }
    };

    const fetchFaqs = async (courseId = null) => {
        try {
            const res = await fetch(FAQ_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const allFaqs = await res.json();
            setSelectedCourseFaqs(courseId ? allFaqs.filter(f => f.courseId === courseId) : allFaqs);
        } catch (err) {
            console.error('Error fetching FAQs:', err);
            setSelectedCourseFaqs([]);
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch(COURSES_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setCourses(data);
            setFilteredCourses(data);
            setMessage({ type: 'success', text: `Loaded ${data.length} courses successfully` });
        } catch (err) {
            console.error('Error fetching courses:', err);
            setMessage({ type: 'error', text: 'Failed to load courses. Please check your connection.' });
            setCourses([]);
            setFilteredCourses([]);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(prev => prev.type === 'success' ? { type: '', text: '' } : prev), 3000);
        }
    };

    const createCourse = async (courseData) => {
        try {
            const payload = {
                title: courseData.title,
                description: courseData.description || null,
                instructor: courseData.instructor || null,
                duration: courseData.duration ? parseInt(courseData.duration) : null,
                videoCount: courseData.videoCount ? parseInt(courseData.videoCount) : null,
                rating: courseData.rating ? parseFloat(courseData.rating) : null,
                image: courseData.image || null,
                instructorId: parseInt(courseData.instructorId),
                categoryId: courseData.categoryId ? parseInt(courseData.categoryId) : null,
                isActive: courseData.isActive
            };
            const res = await fetch(COURSES_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            await fetchCourses();
            setMessage({ type: 'success', text: 'Course created successfully' });
            return true;
        } catch (err) {
            console.error('Error creating course:', err);
            setMessage({ type: 'error', text: 'Failed to create course. Please try again.' });
            return false;
        }
    };

    const updateCourse = async (id, courseData) => {
        try {
            const payload = {
                id, title: courseData.title, description: courseData.description || null,
                instructor: courseData.instructor || null,
                duration: courseData.duration ? parseInt(courseData.duration) : null,
                videoCount: courseData.videoCount ? parseInt(courseData.videoCount) : null,
                rating: courseData.rating ? parseFloat(courseData.rating) : null,
                image: courseData.image || null,
                instructorId: parseInt(courseData.instructorId),
                categoryId: courseData.categoryId ? parseInt(courseData.categoryId) : null,
                isActive: courseData.isActive
            };
            const res = await fetch(`${COURSES_API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            setCourses(prev => prev.map(c => c.id === id ? { ...c, ...payload } : c));
            setMessage({ type: 'success', text: 'Course updated successfully' });
            return true;
        } catch (err) {
            console.error('Error updating course:', err);
            setMessage({ type: 'error', text: 'Failed to update course. Please try again.' });
            return false;
        }
    };

    const deleteCourse = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            const res = await fetch(`${COURSES_API_URL}/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            setCourses(prev => prev.filter(c => c.id !== id));
            setMessage({ type: 'success', text: 'Course deleted successfully' });
            setSelectedCourse(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error deleting course:', err);
            setMessage({ type: 'error', text: 'Failed to delete course. Please try again.' });
        }
    };

    const handleFaqSubmit = async () => {
        if (!faqFormData.question.trim()) return alert('Question is required');

        try {
            const payload = {
                courseId: faqFormData.courseId,
                question: faqFormData.question,
                answer: faqFormData.answer || null,
                sortOrder: faqFormData.sortOrder ? parseInt(faqFormData.sortOrder) : null
            };

            const method = faqModalMode === 'create' ? 'POST' : 'PUT';
            const url = faqModalMode === 'create' ? FAQ_API_URL : `${FAQ_API_URL}/${faqFormData.id}`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save FAQ');

            await fetchFaqs(faqFormData.courseId);
            closeFaqModal();
        } catch (err) {
            console.error(err);
            alert('Failed to save FAQ');
        }
    };

    const deleteFaq = async (id) => {
        if (!window.confirm('Delete this FAQ?')) return;
        try {
            const res = await fetch(`${FAQ_API_URL}/${id}`, { method:'DELETE' });
            if (!res.ok) throw new Error('Failed to delete FAQ');
            await fetchFaqs(faqFormData.courseId);
        } catch (err) {
            console.error(err);
            alert('Failed to delete FAQ');
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchCategories();
        fetchFaqs();
    }, []);

    useEffect(() => {
        let filtered = courses;
        if (searchTerm) filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.instructor && c.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        if (statusFilter !== 'all') filtered = filtered.filter(c => statusFilter === 'active' ? c.isActive : !c.isActive);
        if (categoryFilter !== 'all') filtered = filtered.filter(c => c.categoryId === parseInt(categoryFilter));
        setFilteredCourses(filtered);
    }, [courses, searchTerm, statusFilter, categoryFilter]);

    const openFaqModal = async (mode, faq = null, courseId = null) => {
        if (!courseId) return;

        setFaqModalMode(mode);
        setFaqFormData(faq ? { ...faq } : { id:null, question:'', answer:'', sortOrder:0, courseId });

        try {
            const res = await fetch(FAQ_API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const allFaqs = await res.json();
            const courseFaqs = allFaqs.filter(f => f.courseId == courseId);

            if (mode === 'create' || courseFaqs.length > 0) {
                setSelectedCourseFaqs(courseFaqs);
                setFaqModalOpen(true);
                console.log(`FAQ modal opened for courseId ${courseId}. FAQs loaded:`, courseFaqs);
            } else {
                alert('No FAQs available for this course');
            }
        } catch (err) {
            console.error('Error fetching FAQs:', err);
            alert('Failed to fetch FAQs');
        }
    };

    const openModal = (mode, course = null) => {
        setModalMode(mode);
        setSelectedCourse(course);
        setFormData(course ? {
            title: course.title,
            description: course.description || '',
            instructor: course.instructor || '',
            duration: course.duration?.toString() || '',
            videoCount: course.videoCount?.toString() || '',
            rating: course.rating?.toString() || '',
            image: course.image || '',
            instructorId: course.instructorId?.toString() || '',
            categoryId: course.categoryId?.toString() || '',
            isActive: course.isActive !== false
        } : { title:'', description:'', instructor:'', duration:'', videoCount:'', rating:'', image:'', instructorId:'', categoryId:'', isActive:true });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setFormData({ title:'', description:'', instructor:'', duration:'', videoCount:'', rating:'', image:'', instructorId:'', categoryId:'', isActive:true });
    };

    const handleSubmit = async () => {
        if (!formData.title.trim()) { setMessage({ type:'error', text:'Course title is required' }); return; }
        if (!formData.instructorId) { setMessage({ type:'error', text:'Instructor ID is required' }); return; }
        let success = modalMode==='create' ? await createCourse(formData) : await updateCourse(selectedCourse.id, formData);
        if (success) { closeModal(); setTimeout(() => setMessage({ type:'', text:'' }), 3000); }
    };

    const refreshData = async () => { await fetchCourses(); await fetchCategories(); };
    const getCategoryName = id => { const cat = categories.find(c => c.id===id); return cat ? cat.name : 'Uncategorized'; };
    const formatRating = r => r ? `${r.toFixed(1)} ★` : 'Not rated';
    const formatDuration = d => d ? `${d} min` : 'Not specified';

    const statusCounts = useMemo(() => ({
        total: courses.length,
        active: courses.filter(c => c.isActive!==false).length,
        inactive: courses.filter(c => c.isActive===false).length,
        withRating: courses.filter(c => c.rating && c.rating>0).length
    }), [courses]);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <DashboardHeader onRefresh={refreshData} onAdd={() => openModal('create')} loading={loading} />
                <StatsCards statusCounts={statusCounts} />
                <CourseFilters
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                    categories={categories}
                />
                <div className="-mx-4 sm:-mx-6 lg:-mx-22">
                    <CoursesTable
                        courses={filteredCourses}
                        onView={openCoursePreview}
                        onEdit={openModal}
                        onDelete={deleteCourse}
                        onFaq={(course) => openFaqModal('create', null, course.id)}
                        onManageDetails={(course) => openCourseDetailModal(course.id)}
                        onManageSections={(course) => openCourseSectionModal(course.id)}
                        onManageCollaborators={openCollaboratorsModal} // NEW
                        getCategoryName={getCategoryName}
                        formatDuration={formatDuration}
                        formatRating={formatRating}
                    />
                </div>
                <CourseModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    mode={modalMode}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    categories={categories}
                />
                <FaqModal
                    isOpen={faqModalOpen}
                    onClose={closeFaqModal}
                    formData={faqFormData}
                    setFormData={setFaqFormData}
                    onSubmit={handleFaqSubmit}
                    faqs={selectedCourseFaqs || []}
                    onEdit={(faq) => openFaqModal('edit', faq, faq.courseId)}
                    onDelete={deleteFaq}
                />
                <CourseDetailModal
                    isOpen={courseDetailModalOpen}
                    onClose={closeCourseDetailModal}
                    courseId={selectedCourseId}
                />
                <CourseSectionModal
                    isOpen={courseSectionModalOpen}
                    onClose={closeCourseSectionModal}
                    courseId={selectedCourseSectionId}
                />
                <CoursePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closeCoursePreview}
                    course={previewCourse}
                    courseId={previewCourse?.id}
                />
                {/* NEW: Manage Collaborators Modal */}
                <ManageCollaboratorsModal
                    isOpen={collaboratorsModalOpen}
                    onClose={closeCollaboratorsModal}
                    course={collaboratorsCourse}
                />
            </div>
        </>
    );
};

export default AdminCourseDashboard;