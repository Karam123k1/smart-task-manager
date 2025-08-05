package com.anilaltunkan.security.controller;

import com.anilaltunkan.security.service.UserService;
import com.anilaltunkan.security.dto.ProjectDTO;
import com.anilaltunkan.security.model.Project;
import com.anilaltunkan.security.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByOwner(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(projectService::getProjectsByOwner)
                .map(projects -> projects.stream()
                        .map(project -> ProjectDTO.builder()
                                .id(project.getId())
                                .name(project.getName())
                                .description(project.getDescription())
                                .build())
                                .toList())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project created = projectService.createProject(project);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
