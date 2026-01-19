import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockClasses, Class } from './Classes';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Clock from 'lucide-react/dist/esm/icons/clock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Video from 'lucide-react/dist/esm/icons/video';
import Users from 'lucide-react/dist/esm/icons/users';
import User from 'lucide-react/dist/esm/icons/user';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Timer from 'lucide-react/dist/esm/icons/timer';

export function ClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [classData, setClassData] = useState<Class | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'online' as 'online' | 'offline',
    date: '',
    time: '',
    duration: '',
    instructor: '',
    maxParticipants: 30,
    meetingLink: '',
    location: '',
    mapLink: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundClass = mockClasses.find(c => c.id === classId);
    if (foundClass) {
      setClassData(foundClass);
      setIsEnrolled(foundClass.enrolledUsers.includes(user?.id || ''));
    }
  }, [classId, user?.id]);

  const handleEnrollClass = () => {
    if (!classData) return;

    if (classData.currentParticipants >= classData.maxParticipants) {
      toast({
        title: 'Class is full',
        description: 'This class has reached maximum capacity.',
        variant: 'destructive',
      });
      return;
    }

    if (classData.enrolledUsers.includes(user?.id || '')) {
      toast({
        title: 'Already enrolled',
        description: 'You are already enrolled in this class.',
        variant: 'destructive',
      });
      return;
    }

    setIsEnrollDialogOpen(true);
  };

  const handleConfirmEnroll = () => {
    if (classData && user?.id) {
      const updatedClass = {
        ...classData,
        enrolledUsers: [...classData.enrolledUsers, user.id],
        currentParticipants: classData.currentParticipants + 1,
      };
      setClassData(updatedClass);
      setIsEnrolled(true);
    }
    toast({
      title: 'Enrollment successful',
      description: 'You have been enrolled in the class.',
    });
    setIsEnrollDialogOpen(false);
  };

  const handleCancelEnrollment = () => {
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (classData && user?.id) {
      const updatedClass = {
        ...classData,
        enrolledUsers: classData.enrolledUsers.filter(id => id !== user.id),
        currentParticipants: classData.currentParticipants - 1,
      };
      setClassData(updatedClass);
      setIsEnrolled(false);
    }
    toast({
      title: 'Enrollment cancelled',
      description: 'You have been removed from the class.',
    });
    setIsCancelDialogOpen(false);
  };

  const handleEditClass = () => {
    if (!classData) return;
    setFormData({
      title: classData.title,
      description: classData.description,
      type: classData.type,
      date: classData.date,
      time: classData.time,
      duration: classData.duration,
      instructor: classData.instructor,
      maxParticipants: classData.maxParticipants,
      meetingLink: classData.meetingLink || '',
      location: classData.location || '',
      mapLink: classData.mapLink || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast({
      title: 'Class updated',
      description: 'The class has been successfully updated.',
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteClass = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    toast({
      title: 'Class deleted',
      description: 'The class has been successfully deleted.',
    });
    setIsDeleteDialogOpen(false);
    navigate('/classes');
  };

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Class not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/classes')}
          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">{classData.title}</h1>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                classData.type === 'online' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'
              }`}
            >
              {classData.type === 'online' ? (
                <>
                  <Video className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                  Online Class
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                  Offline Class
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">About This Class</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{classData.description}</p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Class Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                    <p className="text-foreground font-medium">
                      {new Date(classData.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Time</p>
                    <p className="text-foreground font-medium">{classData.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <Timer className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Duration</p>
                    <p className="text-foreground font-medium">{classData.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Instructor</p>
                    <p className="text-foreground font-medium">{classData.instructor}</p>
                  </div>
                </div>
              </div>

              {classData.type === 'online' && classData.meetingLink && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Video className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Meeting Link</p>
                    <a
                      href={classData.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2 font-medium"
                    >
                      Join Microsoft Teams Meeting
                      <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              )}

              {classData.type === 'offline' && classData.location && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-tertiary/5 border border-tertiary/20">
                  <MapPin className="w-5 h-5 text-tertiary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Location</p>
                    <p className="text-foreground font-medium mb-2">{classData.location}</p>
                    {classData.mapLink && (
                      <a
                        href={classData.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tertiary hover:underline flex items-center gap-2 text-sm font-medium"
                      >
                        View on Google Maps
                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border border-border bg-card sticky top-8">
            <CardHeader>
              <CardTitle className="text-foreground">Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Participants</p>
                      <p className="text-lg font-bold text-foreground">
                        {classData.currentParticipants} / {classData.maxParticipants}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium text-foreground">
                      {Math.round((classData.currentParticipants / classData.maxParticipants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((classData.currentParticipants / classData.maxParticipants) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {isAdmin ? (
                <div className="space-y-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleEditClass}
                    className="w-full bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                  >
                    <Edit className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Edit Class
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDeleteClass}
                    className="w-full bg-transparent text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive font-normal"
                  >
                    <Trash2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Delete Class
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border">
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" strokeWidth={1.5} />
                        <p className="text-sm font-medium text-success">You are enrolled in this class</p>
                      </div>
                      {classData.status !== 'completed' && (
                        <Button
                          variant="outline"
                          onClick={handleCancelEnrollment}
                          className="w-full bg-transparent text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive font-normal"
                        >
                          <XCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          Cancel Enrollment
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      {classData.status !== 'completed' ? (
                        <Button
                          onClick={handleEnrollClass}
                          disabled={classData.currentParticipants >= classData.maxParticipants}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          {classData.currentParticipants >= classData.maxParticipants ? 'Class Full' : 'Enroll Now'}
                        </Button>
                      ) : (
                        <div className="p-3 rounded-lg bg-muted text-center">
                          <p className="text-sm text-muted-foreground">This class has been completed</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Edit Class</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update class details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-popover-foreground required-asterisk">Class Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter class title"
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-popover-foreground required-asterisk">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter class description"
                rows={3}
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-popover-foreground required-asterisk">Class Type</Label>
              <Select value={formData.type} onValueChange={(value: 'online' | 'offline') => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type" className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-popover-foreground required-asterisk">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-popover-foreground required-asterisk">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-popover-foreground required-asterisk">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2 hours"
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor" className="text-popover-foreground required-asterisk">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-popover-foreground required-asterisk">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                placeholder="Enter max participants"
                className="bg-background text-foreground border-border"
              />
            </div>

            {formData.type === 'online' && (
              <div className="space-y-2">
                <Label htmlFor="meetingLink" className="text-popover-foreground required-asterisk">Meeting Link</Label>
                <Input
                  id="meetingLink"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="https://teams.microsoft.com/..."
                  className="bg-background text-foreground border-border"
                />
              </div>
            )}

            {formData.type === 'offline' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-popover-foreground required-asterisk">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location address"
                    className="bg-background text-foreground border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mapLink" className="text-popover-foreground">Google Maps Link</Label>
                  <Input
                    id="mapLink"
                    value={formData.mapLink}
                    onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="bg-background text-foreground border-border"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEdit}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              Update Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Delete Class</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete this class? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-normal"
            >
              Delete Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Enroll in Class</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to enroll in "{classData?.title}"?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {classData && new Date(classData.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{classData?.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">{classData?.instructor}</p>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEnrollDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmEnroll}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              <CheckCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Confirm Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Cancel Enrollment</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to cancel your enrollment in "{classData?.title}"?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm text-foreground">
                <strong className="text-warning">Note:</strong> You can re-enroll later if spots are still available.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Keep Enrollment
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-normal"
            >
              <XCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Cancel Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
